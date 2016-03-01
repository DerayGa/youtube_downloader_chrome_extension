var YouTubeParser, getYouTubeUrl;

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(needle) {
    var i, item, j, len, pos;
    pos = -1;
    for (i = j = 0, len = this.length; j < len; i = ++j) {
      item = this[i];
      if (item === needle) {
        pos = i;
      }
      break;
    }
    return pos;
  };
}

YouTubeParser = {
  videoInfo: '',
  rdata: [],
  fmt_str: {
    0: '240p&nbsp;&nbsp;&nbsp;(FLV, 320 x 240, Mono 22KHz MP3)',
    5: '240p&nbsp;&nbsp;&nbsp;(FLV, 400 x 240, Mono 44KHz MP3)',
    6: '360p&nbsp;&nbsp;&nbsp;(FLV, 480 x 360, Mono 44KHz MP3)',
    34: '360p&nbsp;&nbsp;&nbsp;(FLV, 640 x 360, Stereo 44KHz AAC)',
    35: '480p&nbsp;&nbsp;&nbsp;(FLV, 854 x 480, Stereo 44KHz AAC)',
    13: '144p&nbsp;&nbsp;&nbsp;(3GP, 176 x 144, Stereo 8KHz)',
    17: '144p&nbsp;&nbsp;&nbsp;(3GP, 176 x 144, Stereo 44KHz AAC)',
    36: '240p&nbsp;&nbsp;&nbsp;(3GP, 320 x 240, Stereo 44KHz AAC)',
    18: '360p&nbsp;&nbsp;&nbsp;(MP4(H.264), 640 x 360, Stereo 44KHz AAC)',
    22: '720p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)',
    37: '1080p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)',
    38: '3072p&nbsp;&nbsp;&nbsp;(MP4(H.264), 4096 x 3072, Stereo 44KHz AAC)',
    82: '360p&nbsp;&nbsp;&nbsp;(MP4(H.264), 640 x 360, Stereo 44KHz AAC)',
    83: '240p&nbsp;&nbsp;&nbsp;(MP4(H.264), 854 x 240, Stereo 44KHz AAC)',
    84: '720p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1280 x 720, Stereo 44KHz AAC)',
    85: '1080p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1920 x 1080, Stereo 44KHz AAC)',
    43: '360p&nbsp;&nbsp;&nbsp;(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)',
    44: '480p&nbsp;&nbsp;&nbsp;(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)',
    45: '720p&nbsp;&nbsp;&nbsp;(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)',
    46: '1080p&nbsp;&nbsp;&nbsp;(WebM(VP8), 1920 x 1080, Stereo 44KHz Vorbis)',
    100: '360p&nbsp;&nbsp;&nbsp;(WebM(VP8), 640 x 360, Stereo 44KHz Vorbis)',
    101: '480p&nbsp;&nbsp;&nbsp;(WebM(VP8), 854 x 480, Stereo 44KHz Vorbis)',
    102: '720p&nbsp;&nbsp;&nbsp;(WebM(VP8), 1280 x 720, Stereo 44KHz Vorbis)',
    133: '240p&nbsp;&nbsp;&nbsp;(MP4(H.264), 426 x 240, <span style="color:#f00;">video only, no audio</span>)',
    134: '360p&nbsp;&nbsp;&nbsp;(MP4(H.264), 640 x 360, <span style="color:#f00;">video only, no audio</span>)',
    135: '480p&nbsp;&nbsp;&nbsp;(MP4(H.264), 854 x 480, <span style="color:#f00;">video only, no audio</span>)',
    136: '720p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1280 x 720, <span style="color:#f00;">video only, no audio</span>)',
    137: '1080p&nbsp;&nbsp;&nbsp;(MP4(H.264), 1920 x 1080, <span style="color:#f00;">video only, no audio</span>)',
    138: '3072p&nbsp;&nbsp;&nbsp;(MP4(H.264), 4096 x 3072, <span style="color:#f00;">video only, no audio</span>)',
    160: '144p&nbsp;&nbsp;&nbsp;(MP4(H.264), 256 x 144, <span style="color:#f00;">video only, no audio</span>)',
    264: '1440p&nbsp;&nbsp;&nbsp;(MP4(H.264), 2560 x 1440, <span style="color:#f00;">video only, no audio</span>)',
    266: '2160p&nbsp;&nbsp;&nbsp;(MP4(H.264), 3840 x 2160, <span style="color:#f00;">video only, no audio</span>)',
    298: '720p HFR&nbsp;&nbsp;&nbsp;(MP4(H.264), 1280 x 720 HFR, <span style="color:#f00;">video only, no audio</span>)',
    299: '1080p HFR&nbsp;&nbsp;&nbsp;(MP4(H.264), 1920 x 1080 HFR, <span style="color:#f00;">video only, no audio</span>)',
    242: '240p&nbsp;&nbsp;&nbsp;(WebM(VP9), 426 x 240, <span style="color:#f00;">video only, no audio</span>)',
    243: '360p&nbsp;&nbsp;&nbsp;(WebM(VP9), 640 x 360, <span style="color:#f00;">video only, no audio</span>)',
    244: '480p&nbsp;&nbsp;&nbsp;(WebM(VP9), 854 x 480, <span style="color:#f00;">video only, no audio</span>)',
    247: '720p&nbsp;&nbsp;&nbsp;(WebM(VP9), 1280 x 720, <span style="color:#f00;">video only, no audio</span>)',
    248: '1080p&nbsp;&nbsp;&nbsp;(WebM(VP9), 1920 x 1080, <span style="color:#f00;">video only, no audio</span>)',
    271: '1440p&nbsp;&nbsp;&nbsp;(WebM(VP9), 2560 x 1440, <span style="color:#f00;">video only, no audio</span>)',
    272: '2160p&nbsp;&nbsp;&nbsp;(WebM(VP9), 3840 x 2160, <span style="color:#f00;">video only, no audio</span>)',
    278: '144p&nbsp;&nbsp;&nbsp;(WebM(VP9), 256 x 144, <span style="color:#f00;">video only, no audio</span>)',
    302: '720p HFR&nbsp;&nbsp;&nbsp;(WebM(VP9), 1280 x 720 HFR, <span style="color:#f00;">video only, no audio</span>)',
    303: '1080p HFR&nbsp;&nbsp;&nbsp;(WebM(VP9), 1920 x 1080 HFR, <span style="color:#f00;">video only, no audio</span>)',
    308: '1440p HFR&nbsp;&nbsp;&nbsp;(WebM(VP9), 2560 x 1440 HFR, <span style="color:#f00;">video only, no audio</span>)',
    313: '2160&nbsp;&nbsp;&nbsp;(WebM(VP9), 3840 x 2160, <span style="color:#f00;">video only, no audio</span>)',
    315: '2160p HFR&nbsp;&nbsp;&nbsp;(WebM(VP9), 3840 x 2160 HFR, <span style="color:#f00;">video only, no audio</span>)',
    139: '(M4A(AAC), 48 kbit/s <span style="color:#f00;">audio only</span>)',
    140: '(M4A(AAC), 128 kbit/s <span style="color:#f00;">audio only</span>)',
    141: '(M4A(AAC), 256 kbit/s <span style="color:#f00;">audio only</span>)',
    171: '(WebM(Vorbis), 128 kbit/s <span style="color:#f00;">audio only</span>)',
    172: '(WebM(Vorbis), 192 kbit/s <span style="color:#f00;">audio only</span>)'
  },
  setVideoInfo: function(videoInfo) {
    this.videoInfo = videoInfo;
  },
  buildVideoUrlHTMLTag: function(item, title, method) {
    return '<a href="' + unescape(item.fmt_url) + (item.fmt_sig === false ? "" : "&signature=" + item.fmt_sig) + "&title=" + escape(title.replace('"', '')) + '" target="_blank"><b>' + method + '&nbsp;&nbsp;&nbsp;' + this.fmt_str[item.fmt] + '</b></a>';
  },
  parseInfo: function(infostr) {
    var item, j, len, result, tmp, tmp2;
    result = {};
    tmp = infostr.split('&');
    for (j = 0, len = tmp.length; j < len; j++) {
      item = tmp[j];
      tmp2 = item.split('=');
      result[tmp2[0]] = unescape(tmp2[1]);
    }
    return result;
  },
  getYouTubeUrl: function() {
    var div_dl, dllinks, dllinksAdaptive, dllinksAlter, item, j, k, l, len, len1, len2, rdataArray, rdata_reason, rdata_status, result, succ, title, url_adaptive, url_alter, url_classic, webmlinks;
    succ = 0;
    dllinks = '';
    webmlinks = '';
    dllinksAdaptive = '';
    dllinksAlter = '';
    rdataArray = this.parseInfo(this.videoInfo);
    this.rdata = rdataArray;
    url_classic = this.parseUrlsClassic(rdataArray);
    url_adaptive = this.parseUrlsAdaptive(rdataArray);
    url_alter = this.parseUrlsAlter(rdataArray, url_classic, url_adaptive);
    title = this.parseTitle(rdataArray);
    for (j = 0, len = url_classic.length; j < len; j++) {
      item = url_classic[j];
      if ([43, 44, 45, 46, 100, 101, 102].indexOf(parseInt(item.fmt, 10)) > -1) {
        if (webmlinks.length > 0) {
          webmlinks += '<br />';
        }
        webmlinks += this.buildVideoUrlHTMLTag(item, title, 'Watch online');
      } else {
        if (dllinks.length > 0) {
          dllinks += '<br />';
        }
        dllinks += this.buildVideoUrlHTMLTag(item, title, 'Download');
      }
    }
    if (webmlinks.length > 0) {
      if (dllinks.length > 0) {
        dllinks += '<br />';
      }
      dllinks += webmlinks;
    }
    if (url_alter.length > 0) {
      for (k = 0, len1 = url_alter.length; k < len1; k++) {
        item = url_alter[k];
        if (dllinksAlter.length > 0) {
          dllinksAlter += '<br />';
        }
        dllinksAlter += this.buildVideoUrlHTMLTag(item, title, 'Download');
      }
    }
    if (dllinksAlter.length > 0) {
      dllinks += '<br /><br /><span style="color:#f00; font-weight:bold;">sadly 1080p\'s dead again...</span><br /><del>1080p & some other formats redirect download are back online and <span style="color:#f00;font-weight:bold;">testing</span>:<br />';
      dllinks += dllinksAlter + '</del>';
    }
    for (l = 0, len2 = url_adaptive.length; l < len2; l++) {
      item = url_adaptive[l];
      if (dllinksAdaptive.length > 0) {
        dllinksAdaptive += '<br />';
      }
      dllinksAdaptive += this.buildVideoUrlHTMLTag(item, title, 'Download');
    }
    if (dllinksAdaptive.length > 0) {
      if (dllinks.length > 0) {
        dllinks += '<br /><br />special files (separated audio and video):<br />';
      }
      dllinks += dllinksAdaptive;
    }
    if (dllinks.length > 0) {
      $('#result_div').remove();
      div_dl = document.createElement('div');
      $(div_dl).html(dllinks).css('padding', '7px 0 0 0');
      $(div_dl).attr('id', 'result_div');
      $('#videoInfo').after(div_dl);
      $('#downloadInfo').css('display', 'block');
      succ = 1;
    }
    if (succ === 0) {
      rdata_status = rdataArray['status'];
      rdata_reason = this.urldecode(escape(rdataArray['reason']));
      result = '<b>&#28961;&#27861;&#21462;&#24471;&#24433;&#29255; URL</b><br />status : <span style="color:#f00;">' + rdata_status + '</span><br />' + 'reason : <span style="color:#f00;">' + rdata_reason + '</span>';
      $('#result_div').remove();
      div_dl = document.createElement('div');
      $(div_dl).html(result).css('padding', '7 0 7px 0');
      $(div_dl).attr('id', 'result_div');
      $('#videoInfo').after(div_dl);
    }
  },
  parseUrlsClassic: function(rdataArray) {
    var data, dataset, item, items, j, len, temp_type;
    items = [];
    if (typeof rdataArray.url_encoded_fmt_stream_map !== "undefined") {
      dataset = rdataArray.url_encoded_fmt_stream_map.split(',');
      for (j = 0, len = dataset.length; j < len; j++) {
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
          item.fmt_sig = this.SigHandlerAlternative(data.s);
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
    var data, dataset, item, items, j, len, temp_type;
    items = [];
    if (typeof rdataArray.adaptive_fmts !== "undefined") {
      dataset = rdataArray.adaptive_fmts.split(',');
      for (j = 0, len = dataset.length; j < len; j++) {
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
          item.fmt_sig = this.SigHandlerAlternative(data.s);
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
  parseUrlsAlter: function(rdataArray, url_classic, url_adaptive) {
    var base_url, dataset, fmt_adaptive, fmt_classic, i, item35, item37, item38, items, j, k, l, len, len1, len2, len3, len4, m, n, qs, qstemp, temp, tempurl, tmp;
    items = [];
    item35 = {};
    item37 = {};
    item38 = {};
    qstemp = [];
    qs = '';
    base_url = '';
    if (typeof rdataArray.dashmpd !== "undefined") {
      dataset = rdataArray.dashmpd.replace('http://www.youtube.com/api/manifest/dash/', '').split('/');
      for (i = j = 0, len = dataset.length; j < len; i = ++j) {
        temp = dataset[i];
        if (temp === 'sig') {
          dataset[i] = 'signature';
        }
        if (temp === 's') {
          dataset[i] = 'signature';
          dataset[i + 1] = this.SigHandlerAlternative(dataset[i + 1]);
        }
      }
      for (i = k = 0, len1 = dataset.length; k < len1; i = k += 2) {
        temp = dataset[i];
        qstemp.push(temp + '=' + dataset[i + 1]);
      }
      qs = qstemp.join('&');
      if (qs.toLowerCase().indexOf('ratebypass') === -1) {
        qs = qs + '&ratebypass=yes';
      }
      for (i = l = 0, len2 = url_classic.length; l < len2; i = ++l) {
        tempurl = url_classic[i];
        tempurl = unescape(url_classic[i].fmt_url).split('?');
        if (tempurl[0] !== '' && (tempurl[0] != null) && typeof tempurl[0] !== "undefined" && tempurl[0].length > 0) {
          base_url = tempurl[0];
          break;
        }
      }
      fmt_classic = [];
      for (m = 0, len3 = url_classic.length; m < len3; m++) {
        tmp = url_classic[m];
        fmt_classic[tmp.fmt] = true;
      }
      fmt_adaptive = [];
      for (n = 0, len4 = url_adaptive.length; n < len4; n++) {
        tmp = url_adaptive[n];
        fmt_adaptive[tmp.fmt] = true;
      }
      if (fmt_adaptive[135] && fmt_classic[35] === void 0) {
        item35.fmt = 35;
        item35.fmt_url = base_url + '?' + qs + '&itag=35';
        items.push(item35);
      }
      if ((fmt_adaptive[137] || fmt_adaptive[264]) && fmt_classic[37] === void 0) {
        item37.fmt = 37;
        item37.fmt_url = base_url + '?' + qs + '&itag=37';
        items.push(item37);
      }
      if (fmt_adaptive[138] && fmt_classic[38] === void 0) {
        item38.fmt = 38;
        item38.fmt_url = base_url + '?' + qs + '&itag=38';
        items.push(item38);
      }
      return items;
    }
    return [];
  },
  parseTitle: function(rdataArray) {
    if (typeof rdataArray.title !== "undefined") {
      return rdataArray.title.replace(/%22/g, '');
    }
    return '';
  },
  urldecode: function(str) {

    /*
    Decodes URL-encoded string  
    
    version: 1004.2314
    discuss at: http://phpjs.org/functions/urldecode    // +   original by: Philip Peterson
    +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    +      input by: AJ
    +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    +   improved by: Brett Zamir (http://brett-zamir.me)    // +      input by: travc
    +      input by: Brett Zamir (http://brett-zamir.me)
    +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    +   improved by: Lars Fischer
    +      input by: Ratheous    // +   improved by: Orlando
    +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    +      bugfixed by: Rob
    %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on    // %        note 2: pages served as UTF-8
    *     example 1: urldecode('Kevin+van+Zonneveld%21');
    *     returns 1: 'Kevin van Zonneveld!'
    *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    *     returns 2: 'http://kevin.vanzonneveld.net/'
    *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
     */
    return decodeURIComponent(str.replace(/\+/g, '%20'));
  },
  swap: function(sArray, location) {
    var ref;
    location = location % sArray.length;
    ref = [sArray[location], sArray[0]], sArray[0] = ref[0], sArray[location] = ref[1];
    return sArray;
  },
  SigHandlerAlternative: function(s) {
    var code, j, len, sArray, scode;
    sArray = s.split("");
    scode = [54, 0, -1, 52, -3, 0, 16, 0];
    for (j = 0, len = scode.length; j < len; j++) {
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

getYouTubeUrl = function() {
  YouTubeParser.setVideoInfo($('#videoInfo').val());
  return YouTubeParser.getYouTubeUrl();
};
