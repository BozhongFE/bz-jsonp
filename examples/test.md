```preyaml
name: 嵌套请求
order: 2
```

# test

```javascript

var jsonp = getScript();

//嵌套请求

var data = {
	tid : '2'
};

jsonp('//crazy.office.bzdev.net/api/science/share.jsonp', data, '__c', function(data){
	console.log(1,data)
	jsonp('//common.office.bzdev.net/bbs/common_member.jsonp',function(data){
		console.log(2,data)
	});
});
```