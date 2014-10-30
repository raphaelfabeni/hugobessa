---
layout: post
title:  'Simulando conexões lentas no localhost'
link: https://github.com/tjgq/grunt-throttle
date:   2014-4-5 10:52:00
categories: grunt
draft: true
---

Plugin [`grunt-throttle`](https://github.com/tjgq/grunt-throttle):

```javascript
throttle: {
    default: {
        remote_host: '127.0.0.1'
        remote_port: 8000,
        local_port: 8001,
        upstream: 10*1024, /* in bytes */
        downstream: 100*1024, /* in bytes */
        keepalive: true
    }
}
```

Simples assim. [Via Thulio Philipe](https://www.facebook.com/groups/modernworkflow/permalink/471572986276250/?stream_ref=2 "via Thulio Philipe").
