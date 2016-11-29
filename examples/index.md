```preyaml
name: 基础使用
order: 1
```

# 使用方法

```javascript

var jsonp = getScript();

//参数齐全

var data = {
	tid : '2'
};

jsonp('//crazy.office.bzdev.net/api/science/share.jsonp', data, '__c', function(data){
	console.log(data)
});


//参数不齐

jsonp('//common.office.bzdev.net/bbs/common_member.jsonp', '__c', function(data){
	console.log(data)
});


jsonp('//common.office.bzdev.net/bbs/common_member.jsonp',{},function(data){
	console.log(data)
});


jsonp('//common.office.bzdev.net/bbs/common_member.jsonp',function(data){
	console.log(data)
});


```