;(function(window) {
  settings = {
    strings: {
      goodRatings:      "Declarou como bom",
      badRatings:       "Estava incerto",
      score:            "Satisfação com o atendimento",
      zendeskPlug:      'Powered by <a href="http://www.zendesk.com/">Zendesk</a>'
    },
    element: null,
    ratings: {
      good:             95,
      bad:              5	
    }
  }

  function configure(options) {
    var prop;
    for (prop in options) {
      if (options.hasOwnProperty(prop)) {
        settings[prop] = options[prop];
      }
    }
  }

  function render() {

    var markup =  '\
        <div class="zd_satisfaction col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12" style="background-color:#fff; padding:10px 30px; border-bottom:3px solid #e8e8e8; border-radius:100px;">\
            <div class="zd_satisfaction_score">\
            <p class="zd_rating_number" style="color:#8ACB00"><span class="counter">' + settings.ratings.good + '</span>%</p>\
            <p class="zd_rating_string" style="color:#8ACB00; line-height:1.5em;"><strong>' + settings.strings.score + '</strong></p><br>\
          </div>\
        </div>\
        <div class="zd_plug col-md-12 col-sm-12 col-xs-12">' + settings.strings.zendeskPlug + '</div>\
      ';

    if (settings.element != null && document.getElementById(settings.element)) {
        document.getElementById(settings.element).innerHTML = markup;
    } else if (settings.element == null) {
        document.write(markup);
    } else {
        return;
    }
  }

  var Satisfaction = {
    show: function(options) {
      configure(options);
      render();
    }
  }

  window.Satisfaction = Satisfaction;

}(this.window || this));