YouTubeParser = {
  fmt_str: {
    0: '240p&nbsp;(FLV, 320 x 240, Mono 22KHz MP3)',
    5: '240p&nbsp;(FLV, 400 x 240, Mono 44KHz MP3)',
    6: '360p&nbsp;(FLV, 480 x 360, Mono 44KHz MP3)',
    34: '360p&nbsp;(FLV, 640 x 360, Stereo 44KHz AAC)',
    35: '480p&nbsp;(FLV, 854 x 480, Stereo 44KHz AAC)',
    13: '144p&nbsp;(3GP, 176 x 144, Stereo 8KHz)',
    17: '144p&nbsp;(3GP, 176 x 144, Stereo 44KHz AAC)',
    36: '240p&nbsp;(3GP, 320 x 240, Stereo 44KHz AAC)',
    18: '360p&nbsp;(MP4(H.264), 640 x 360, Stereo 44KHz AAC)',
    22: '720p&nbsp;(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)',
    37: '1080p&nbsp;(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)',
    38: '3072p&nbsp;(MP4(H.264), 4096 x 3072, Stereo 44KHz AAC)',
    82: '360p&nbsp;(MP4(H.264), 640 x 360, Stereo 44KHz AAC)',
    83: '240p&nbsp;(MP4(H.264), 854 x 240, Stereo 44KHz AAC)',
    84: '720p&nbsp;(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)',
    85: '1080p&nbsp;(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)',
    43: '360p&nbsp;(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)',
    44: '480p&nbsp;(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)',
    45: '720p&nbsp;(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)',
    46: '1080p&nbsp;(WebM(VP8), 1920 x 1080, Stereo 44KHz Vorbis)',
    100: '360p&nbsp;(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)',
    101: '480p&nbsp;(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)',
    102: '720p&nbsp;(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)',
    133: '240p&nbsp;(MP4(H.264), 426 x 240, <span">video only, no audio</span>)',
    134: '360p&nbsp;(MP4(H.264), 640 x 360, <span">video only, no audio</span>)',
    135: '480p&nbsp;(MP4(H.264), 854 x 480, <span">video only, no audio</span>)',
    136: '720p&nbsp;(MP4(H.264), 1280 x 720, <span">video only, no audio</span>)',
    137: '1080p&nbsp;(MP4(H.264), 1920 x 1080, <span">video only, no audio</span>)',
    138: '3072p&nbsp;(MP4(H.264), 4096 x 3072, <span">video only, no audio</span>)',
    160: '144p&nbsp;(MP4(H.264), 256 x 144, <span">video only, no audio</span>)',
    264: '1440p&nbsp;(MP4(H.264), 2560 x 1440, <span">video only, no audio</span>)',
    266: '2160p&nbsp;(MP4(H.264), 3840 x 2160, <span">video only, no audio</span>)',
    298: '720p HFR&nbsp;(MP4(H.264), 1280 x 720 HFR, <span">video only, no audio</span>)',
    299: '1080p HFR&nbsp;(MP4(H.264), 1920 x 1080 HFR, <span">video only, no audio</span>)',
    242: '240p&nbsp;(WebM(VP9), 426 x 240, <span">video only, no audio</span>)',
    243: '360p&nbsp;(WebM(VP9), 640 x 360, <span">video only, no audio</span>)',
    244: '480p&nbsp;(WebM(VP9), 854 x 480, <span">video only, no audio</span>)',
    247: '720p&nbsp;(WebM(VP9), 1280 x 720, <span">video only, no audio</span>)',
    248: '1080p&nbsp;(WebM(VP9), 1920 x 1080, <span">video only, no audio</span>)',
    271: '1440p&nbsp;(WebM(VP9), 2560 x 1440, <span">video only, no audio</span>)',
    272: '2160p&nbsp;(WebM(VP9), 3840 x 2160, <span">video only, no audio</span>)',
    278: '144p&nbsp;(WebM(VP9), 256 x 144, <span">video only, no audio</span>)',
    302: '720p HFR&nbsp;(WebM(VP9), 1280 x 720 HFR, <span">video only, no audio</span>)',
    303: '1080p HFR&nbsp;(WebM(VP9), 1920 x 1080 HFR, <span">video only, no audio</span>)',
    308: '1440p HFR&nbsp;(WebM(VP9), 2560 x 1440 HFR, <span">video only, no audio</span>)',
    313: '2160&nbsp;(WebM(VP9), 3840 x 2160, <span">video only, no audio</span>)',
    315: '2160p HFR&nbsp;(WebM(VP9), 3840 x 2160 HFR, <span">video only, no audio</span>)',
    139: '(M4A(AAC), 48 kbit/s <span">audio only</span>)',
    140: '(M4A(AAC), 128 kbit/s <span">audio only</span>)',
    141: '(M4A(AAC), 256 kbit/s <span">audio only</span>)',
    171: '(WebM(Vorbis), 128 kbit/s <span">audio only</span>)',
    172: '(WebM(Vorbis), 192 kbit/s <span">audio only</span>)'
  },

  buildVideoUrlHTMLTag: function(item, title, method) {
    var link = this.fmt_str[item.fmt].split(', ');
    var format = link[0].replace('(', '');
    link.shift();
    var dl = unescape(item.fmt_url);

    var icon = '<i class="fa fa-download" /> <i class="fa fa-film" />';
    if (this.fmt_str[item.fmt].indexOf('audio only') > -1)
      icon = icon.replace('film', 'music');
    if (this.fmt_str[item.fmt].indexOf('no audio') > -1)
      icon = icon.replace('film', 'file-video-o');

    if (item.fmt_sig)
      dl += ('&signature=' + item.fmt_sig);
    dl += ('&title=' + escape(title.replace('"', '')));

    return '<a href="' + dl + '"' + ' download>' +
      '<div class="dl">' + icon + '&nbsp;' + method + '&nbsp;' + format + '</div>' +
      ((link.length) ? ('<div class="desc">(' + link.join(', ') + '</div>') : '') + '</a>';
  },

  getYouTubeUrl: function(videoInfo) {
    var dllinks = [];
    var dllinksAdaptive = [];
    var rdataArray = this.parseInfo(videoInfo);
    var url_classic = this.parseUrlsClassic(rdataArray);
    var url_adaptive = this.parseUrlsAdaptive(rdataArray);
    var title = this.parseTitle(rdataArray);
    var downloadTxt = chrome.i18n.getMessage("download");

    for (var j = 0, len = url_classic.length; j < len; j++) {
      var item = url_classic[j];
      if ([43, 44, 45, 46, 100, 101, 102].indexOf(parseInt(item.fmt, 10)) > -1) {
        continue;
      }

      var vlink = this.buildVideoUrlHTMLTag(item, title, downloadTxt);

      if ([18, 22, 37, 38, 82, 83, 84, 85].indexOf(parseInt(item.fmt, 10)) > -1) {

        dllinks.push(vlink);
        continue;
      }

      dllinksAdaptive.push(vlink);
    }

    for (var l = 0, len = url_adaptive.length; l < len; l++) {
      var item = url_adaptive[l];

      var vlink = this.buildVideoUrlHTMLTag(item, title, downloadTxt);

      if ([140, 141].indexOf(parseInt(item.fmt, 10)) > -1) {
        dllinks.push(vlink);
        continue;
      }
      dllinksAdaptive.push(vlink);
    }

    if (dllinksAdaptive.length > 0) {
      dllinks.push('<div class="small">' + dllinksAdaptive.join('') + '</div>');
    }

    if (dllinks.length > 0) {
      $('#downloadInfo').addClass('wide').html(dllinks.join('<hr>'));
    } else {
      videoNotFound();
    }
  },

  parseInfo: function(infostr) {
    var item, result, tmp, tmp2;
    result = {};
    tmp = infostr.split('&');
    for (var j = 0, len = tmp.length; j < len; j++) {
      item = tmp[j];
      tmp2 = item.split('=');
      result[tmp2[0]] = unescape(tmp2[1]);
    }
    return result;
  },

  parseUrlsClassic: function(rdataArray) {
    var data, dataset, item, items, temp_type;
    items = [];
    if (typeof rdataArray.url_encoded_fmt_stream_map !== "undefined") {
      dataset = rdataArray.url_encoded_fmt_stream_map.split(',');
      for (var j = 0, len = dataset.length; j < len; j++) {
        data = dataset[j];
        data = this.parseInfo(data);
        item = {};
        temp_type = '';
        item.fmt = parseInt(data.itag, 10);
        item.fmt_url = data.url;
        if (typeof data.sig !== "undefined") {
          item.fmt_sig = data.sig;
        } else if (typeof data.signature !== "undefined") {
          item.fmt_sig = data.signature;
        } else if (typeof data.s !== "undefined") {
          item.fmt_sig = this.sigHandlerAlternative(data.s);
        } else {
          item.fmt_sig = false;
        }
        if (typeof data.type !== "undefined") {
          temp_type = '(' + unescape(data.type) + ')';
        }
        if (typeof this.fmt_str[item.fmt] === 'undefined') {
          this.fmt_str[item.fmt] = temp_type;
        }
        items.push(item);
      }
    }
    return items;
  },

  parseUrlsAdaptive: function(rdataArray) {
    var data, dataset, item, items, temp_type;
    items = [];
    if (typeof rdataArray.adaptive_fmts !== "undefined") {
      dataset = rdataArray.adaptive_fmts.split(',');
      for (var j = 0, len = dataset.length; j < len; j++) {
        data = dataset[j];
        data = this.parseInfo(data);
        item = {};
        temp_type = '';
        item.fmt = parseInt(data.itag, 10);
        item.fmt_url = data.url;
        if (typeof data.sig !== "undefined") {
          item.fmt_sig = data.sig;
        } else if (typeof data.signature !== "undefined") {
          item.fmt_sig = data.signature;
        } else if (typeof data.s !== "undefined") {
          item.fmt_sig = this.sigHandlerAlternative(data.s);
        }
        if (typeof data.type !== "undefined") {
          temp_type = '(' + unescape(data.type) + ')';
        }
        if (typeof this.fmt_str[item.fmt] === 'undefined') {
          this.fmt_str[item.fmt] = temp_type;
        }
        items.push(item);
      }
    }
    return items;
  },

  parseTitle: function(rdataArray) {
    if (typeof rdataArray.title !== "undefined") {
      return rdataArray.title.replace(/%22/g, '');
    }
    return '';
  },

  swap: function(sArray, location) {
    var ref;
    location = location % sArray.length;
    ref = [sArray[location], sArray[0]], sArray[0] = ref[0], sArray[location] = ref[1];
    return sArray;
  },

  sigHandlerAlternative: function(s) {
    var code, sArray, scode;
    sArray = s.split("");
    scode = [4, 3, 0, 50, 0, -1, 20, -1];
    for (var j = 0, len = scode.length; j < len; j++) {
      code = scode[j];
      if (code > 0) {
        sArray = this.swap(sArray, code);
      } else if (code === 0) {
        sArray = sArray.reverse();
      } else {
        sArray = sArray.slice(-code);
      }
    }
    return sArray.join("");
  }
};

function videoNotFound() {
  var videoNotFound = chrome.i18n.getMessage("videoNotFound");
  $('#downloadInfo').html(videoNotFound).addClass('errormsg');
}

function getQueryVariable(variable, query) {
  if (!query)
    return undefined;

  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return undefined;
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    var tablink = tab.url;
    //1. get video id
    var video_id = getQueryVariable('v', tablink.split('?')[1]);

    //2. using AJAX get video info via id
    if (!video_id) {
      videoNotFound();
      return;
    }

    var link = 'https://www.youtube.com/get_video_info?video_id=' + video_id +
      '&sts=16849&eurl=https%3A%2F%2Fyoutube.googleapis.com%2Fv%2F' + video_id;

    $.get(link, function(data) {
      //3. Parse link for download
      YouTubeParser.getYouTubeUrl(data);
    });
  });
});