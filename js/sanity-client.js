/**
 * Sanity CMS Client — fetches content from Sanity CDN
 * and injects it into the static HTML pages.
 * Falls back to existing HTML content if API fails.
 */
const SanityCMS = (function () {
  const PROJECT_ID = 'wd53xh69';
  const DATASET = 'production';
  const API_VERSION = '2024-01-01';
  const CDN_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

  function query(groq, params) {
    var url = CDN_URL + '?query=' + encodeURIComponent(groq);
    if (params) {
      Object.keys(params).forEach(function (key) {
        url += '&$' + key + '="' + encodeURIComponent(params[key]) + '"';
      });
    }
    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) { return data.result; });
  }

  function imageUrl(ref) {
    if (!ref || !ref.asset || !ref.asset._ref) return '';
    // Convert sanity image ref to URL
    // Format: image-{id}-{width}x{height}-{format}
    var parts = ref.asset._ref.replace('image-', '').split('-');
    var id = parts[0];
    var dimensions = parts[1];
    var format = parts[2];
    return 'https://cdn.sanity.io/images/' + PROJECT_ID + '/' + DATASET + '/' + id + '-' + dimensions + '.' + format;
  }

  function getLocalized(obj, lang) {
    if (!obj) return '';
    return obj[lang] || obj['vi'] || '';
  }

  // ---- BIM Projects (services.html tab-model) ----
  function loadBimProjects(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var lang = localStorage.getItem('site_lang') || 'vi';

    query('*[_type == "bimProject"] | order(order asc)')
      .then(function (items) {
        if (!items || items.length === 0) return; // keep existing HTML

        var grid = container.querySelector('.bm-masonry');
        if (!grid) return;

        grid.innerHTML = items.map(function (item) {
          var wideClass = item.isWide ? ' wide' : '';
          var badgeColor = item.badgeColor === 'green' ? ' green' : item.badgeColor === 'blue' ? ' blue' : '';
          var tags = (item.tags || []).map(function (t) {
            return '<span class="bm-tag">' + t + '</span>';
          }).join('');

          return '<div class="bm-card' + wideClass + '">' +
            '<div class="bm-img">' +
              '<img src="' + imageUrl(item.image) + '" alt="' + getLocalized(item.title, lang) + '" loading="lazy">' +
              '<span class="bm-badge' + badgeColor + '">' + getLocalized(item.badge, lang) + '</span>' +
            '</div>' +
            '<div class="bm-body">' +
              '<div class="bm-title">' + getLocalized(item.title, lang) + '</div>' +
              '<div class="bm-desc">' + getLocalized(item.description, lang) + '</div>' +
              '<div class="bm-meta">' + tags + '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load BIM projects, using fallback HTML', err);
      });
  }

  // ---- Design Services (services.html tab-design) ----
  function loadDesignServices(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var lang = localStorage.getItem('site_lang') || 'vi';

    query('*[_type == "designService"] | order(order asc)')
      .then(function (items) {
        if (!items || items.length === 0) return;

        var capabilities = items.filter(function (i) { return i.itemType === 'capability'; });
        var works = items.filter(function (i) { return i.itemType === 'work'; });
        var workflows = items.filter(function (i) { return i.itemType === 'workflow'; });

        // Update capabilities grid
        var capGrid = container.querySelector('.dsg-cap-grid');
        if (capGrid && capabilities.length > 0) {
          capGrid.innerHTML = capabilities.map(function (item) {
            return '<div class="dsg-cap">' +
              '<div class="dsg-cap-icon">' + (item.icon || '') + '</div>' +
              '<div class="dsg-cap-title">' + getLocalized(item.title, lang) + '</div>' +
              '<div class="dsg-cap-desc">' + getLocalized(item.description, lang) + '</div>' +
            '</div>';
          }).join('');
        }

        // Update works grid
        var workGrid = container.querySelector('.dsg-work-grid');
        if (workGrid && works.length > 0) {
          workGrid.innerHTML = works.map(function (item) {
            var tags = (item.tags || []).map(function (t) {
              return '<span class="dsg-tag">' + t + '</span>';
            }).join('');
            return '<div class="dsg-work-card">' +
              '<div class="dsg-work-img">' +
                '<img src="' + imageUrl(item.image) + '" alt="' + getLocalized(item.title, lang) + '" loading="lazy">' +
              '</div>' +
              '<div class="dsg-work-body">' +
                '<div class="dsg-work-title">' + getLocalized(item.title, lang) + '</div>' +
                '<div class="dsg-work-desc">' + getLocalized(item.description, lang) + '</div>' +
                '<div class="dsg-work-meta">' + tags + '</div>' +
              '</div>' +
            '</div>';
          }).join('');
        }

        // Update workflow steps
        var wfContainer = container.querySelector('.dsg-wf-steps');
        if (wfContainer && workflows.length > 0) {
          wfContainer.innerHTML = workflows.map(function (item) {
            return '<div class="dsg-wf-step">' +
              '<div class="dsg-wf-num">' + (item.stepNumber || '') + '</div>' +
              '<div class="dsg-wf-label">' + getLocalized(item.title, lang) + '</div>' +
            '</div>';
          }).join('');
        }
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load design services, using fallback HTML', err);
      });
  }

  // ---- Portfolio Projects (projects.html) ----
  function loadProjects(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var lang = localStorage.getItem('site_lang') || 'vi';

    query('*[_type == "project"] | order(order asc)')
      .then(function (items) {
        if (!items || items.length === 0) return;

        var bimItems = items.filter(function (i) { return i.category === 'bim'; });
        var trainItems = items.filter(function (i) { return i.category === 'train'; });

        // Update BIM projects grid
        var bimGrid = container.querySelector('#bim-grid');
        if (bimGrid && bimItems.length > 0) {
          bimGrid.innerHTML = bimItems.map(function (item) {
            return buildProjectCard(item, lang);
          }).join('');
        }

        // Update Training projects grid
        var trainGrid = container.querySelector('#train-grid');
        if (trainGrid && trainItems.length > 0) {
          trainGrid.innerHTML = trainItems.map(function (item) {
            return buildProjectCard(item, lang);
          }).join('');
        }
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load projects, using fallback HTML', err);
      });
  }

  function buildProjectCard(item, lang) {
    var wideClass = item.isWide ? ' wide' : '';
    var badgeColor = item.badgeColor === 'green' ? ' green' : item.badgeColor === 'blue' ? ' blue' : '';
    var catColor = item.categoryLabelColor === 'green' ? ' green' : '';
    var tags = (item.tags || []).map(function (t) {
      return '<span class="pcard-tag">' + t + '</span>';
    }).join('');

    return '<div class="pcard' + wideClass + '" data-category="' + item.category + '">' +
      '<div class="pcard-img">' +
        '<img src="' + imageUrl(item.image) + '" alt="' + getLocalized(item.title, lang) + '" loading="lazy">' +
        '<span class="pcard-badge' + badgeColor + '">' + getLocalized(item.badge, lang) + '</span>' +
      '</div>' +
      '<div class="pcard-body">' +
        '<div class="pcard-cat' + catColor + '">' + getLocalized(item.categoryLabel, lang) + '</div>' +
        '<div class="pcard-title">' + getLocalized(item.title, lang) + '</div>' +
        '<div class="pcard-desc">' + getLocalized(item.description, lang) + '</div>' +
        '<div class="pcard-meta">' + tags + '</div>' +
      '</div>' +
    '</div>';
  }

  // ---- Online Courses (services.html tab-online) ----
  function loadOnlineCourses(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var lang = localStorage.getItem('site_lang') || 'vi';

    query('*[_type == "onlineCourse"] | order(order asc)')
      .then(function (items) {
        if (!items || items.length === 0) return;

        var item = items[0]; // Primary course
        var lessonsGrid = container.querySelector('.course-lessons');
        if (!lessonsGrid || !item.lessons) return;

        lessonsGrid.innerHTML = item.lessons.map(function (lesson) {
          var tags = (lesson.tags || []).map(function (t) {
            var tagClass = t.type === 'video' ? 'tag-video' : t.type === 'file' ? 'tag-file' : 'tag-file';
            var tagIcon = t.type === 'video' ? '🎬' : '📄';
            return '<span class="lesson-tag ' + tagClass + '">' + tagIcon + ' ' + (t.label || '') + '</span>';
          }).join('');

          return '<div class="lesson-card">' +
            '<div class="lesson-num">' + (lesson.number || '') + '</div>' +
            '<div class="lesson-body">' +
              '<div class="lesson-title">' + getLocalized(lesson.title, lang) + '</div>' +
              '<div class="lesson-tags">' + tags + '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load online courses, using fallback HTML', err);
      });
  }

  // ---- Corporate Training (services.html tab-corp) ----
  function loadCorpTraining(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var lang = localStorage.getItem('site_lang') || 'vi';

    query('*[_type == "corpTraining"] | order(order asc)')
      .then(function (items) {
        if (!items || items.length === 0) return;

        var item = items[0];

        // Update target audience
        var targetGrid = container.querySelector('.target-grid');
        if (targetGrid && item.targetAudience) {
          targetGrid.innerHTML = item.targetAudience.map(function (t) {
            return '<div class="target-card">' +
              '<div class="tc-icon">' + (t.icon || '') + '</div>' +
              '<div class="tc-title">' + getLocalized(t.title, lang) + '</div>' +
            '</div>';
          }).join('');
        }

        // Update outcomes
        var outcomeGrid = container.querySelector('.outcome-grid');
        if (outcomeGrid && item.outcomes) {
          outcomeGrid.innerHTML = item.outcomes.map(function (o) {
            return '<div class="outcome-item">' +
              '<span class="oi-icon">' + (o.icon || '') + '</span>' +
              '<span>' + getLocalized(o.text, lang) + '</span>' +
            '</div>';
          }).join('');
        }

        // Update modules
        var moduleGrid = container.querySelector('.module-grid');
        if (moduleGrid && item.modules) {
          moduleGrid.innerHTML = item.modules.map(function (mod) {
            var modItems = (mod.items || []).map(function (li) {
              return '<li>' + getLocalized(li, lang) + '</li>';
            }).join('');

            var imgHtml = mod.image
              ? '<img class="module-img" src="' + imageUrl(mod.image) + '" alt="' + getLocalized(mod.title, lang) + '" loading="lazy">'
              : '';

            return '<div class="module-card">' +
              imgHtml +
              '<div class="module-body">' +
                '<div class="module-num">' + getLocalized(mod.moduleNumber, lang) + '</div>' +
                '<div class="module-title">' + getLocalized(mod.title, lang) + '</div>' +
                '<ul class="module-list">' + modItems + '</ul>' +
              '</div>' +
            '</div>';
          }).join('');
        }
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load corp training, using fallback HTML', err);
      });
  }

  // ---- Homepage Featured Content (index.html) ----
  function loadHomePage(callback) {
    query('*[_type == "homePage"][0]{ heroTitle, heroSubtitle, heroCta, heroCtaLink, featuredServicesTitle, featuredServices, featuredProjectsTitle, featuredProjects[]->{ _id, title, description, category, image, badge, badgeColor, tags }, stats }')
      .then(function (data) {
        if (data && callback) callback(data);
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load home page data', err);
      });
  }

  // ---- Site Settings ----
  function loadSiteSettings(callback) {
    query('*[_type == "siteSettings"][0]')
      .then(function (data) {
        if (data && callback) callback(data);
      })
      .catch(function (err) {
        console.warn('SanityCMS: Failed to load site settings', err);
      });
  }

  return {
    loadBimProjects: loadBimProjects,
    loadDesignServices: loadDesignServices,
    loadProjects: loadProjects,
    loadOnlineCourses: loadOnlineCourses,
    loadCorpTraining: loadCorpTraining,
    loadHomePage: loadHomePage,
    loadSiteSettings: loadSiteSettings,
    query: query,
    imageUrl: imageUrl,
  };
})();
