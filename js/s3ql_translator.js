var S3QLtranslator = function (query) {
	//start of by reading all that is before the first |
	var entityNames = {"S":"statement", "R": "rule","C":"collection","I":"item","P":"project","U":"user","D":"deployment"};
	var s3ql_query = "";
	//Detect any operation specification; separate components so that each can be trimmed
	var op = query.trim().match(/select|update|delete|insert/);
	if(op) { 
	op = op[0].trim(); 
	var targetAndParams = query.replace(op,"").trim().match(/\((.*)\)/);
	
	if(!targetAndParams){
		console.log('invalid query - parameters are required to be inside parenthesis');
		return false;
		}
	targetAndParams = targetAndParams[1];
	}
	else {
		op = "select";
		var targetAndParams = query.trim();
	}
	
	
	var target = targetAndParams.trim().match(/^(D|U|P|C|R|I|S)/);
	if(!target){
		console.log('invalid query - one of D|P|C|R|I|S is required to initialize the query');
		return false;
	}
	target = target[1];
	
	//var template = targetAndParams.trim().match(target+'\\.[^|, ]+','g');
	var t = targetAndParams.trim().match('[^|]*|');
	var template = t[0].split(',');
	var search = '';
	if(template){
		for (var i=0; i<template.length; i++) {
			if(template[i]!=='' && template[i].trim()!==target){
				search += template[i].trim().replace(target+'\.','');
				if(i!==template.length-1){
					search += ',';
				}

			}
		}
	}

	var params = targetAndParams.trim().match(/\|(.*)/);
	

	//Detect if there is more than 1 paramenter
	var s3ql_params = "";
	if(params){
		s3ql_params += "<where>";
		params = params[1].trim();
		var p = params.split(",");
		for (var i=0; i<p.length; i++) {
			 var pi = p[i].trim();
			 var attrValue = pi.match(/(.*)=(.*)/);
			 if(attrValue){
				var attr = attrValue[1].trim();
				var value = attrValue[2].trim();
				if(attr && value){
					if(entityNames[attr]) {attr =entityNames[attr]+"_id";}
					
				}
				
			 }
			 else if (pi.match(/(D|P|C|R|I|S)(.*)/)) {
					var uid_info = uid_resolve(pi);
					//var id = pi.match(/(D|P|C|R|I|S)(.*)/);
					attr = entityNames[uid_info['letter']]+"_id";
					value = uid_info['origin'];
					
			}
			s3ql_params += "<"+attr+">"+value+"</"+attr+">";
		}
		s3ql_params += "</where>";
	}
	
	//Now build the s3ql query
	if(op=="select"){
		if(typeof(search)==='undefined' || search ==''){
			search = '*';
		}
		s3ql_query += "<S3QL><select>"+search+"</select><from>"+entityNames[target]+"</from>";
	}
	else {
		s3ql_query += "<S3QL><"+op+">"+entityNames[target]+"</"+op+">";
	}
	s3ql_query += s3ql_params;
	s3ql_query += "</S3QL>";
	return s3ql_query;
	
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function uid_resolve(uid){
	// //#Valid UID rules
	//# 1.  Individual non-D entities must be preceded by a D entity 
	//# 2. D entities must always resolve to a URL
	//# 3. Entities are separated by #
	//# 4. Entities start with D U P C I R S
	//# 5. Entities must appear according to their order in the core model:
	//# a. P cannot be preceded by C,R,I,S
	//# b. C cannot be preceded by I,R
	//# c. R cannot be preceded by S
	//# d. I cannot be preceded by S
	// A uid may start with a URL, but subsequent Did in the uid string must correspond to the alphanumeric version of the Did uri (why? is this rule really necessary)?
	
		//find all the D
		 var uid_info = {};
		 var tmp1 = uid.match(/([D|(http)][^D]+)/g); // find all D followed by non-D
		 var tmp2 = uid.match(/([D|U|P|C|R|S|I])(\d+)$/);
		
		 var dUIDS = [];
		 //the did is the last one found, if any; no mothership unless there is a Did
		 if(tmp1!==null && typeof(tmp1[1])!=='undefined'){
			tmp4 = tmp1[1].match(/(D\d+|http[^D|P|U|C|R|I|S]+)/);
			uid_info['did'] = tmp4[1];//now find the LAST of the uid, if there are many
			var tmp3 = uid.match(/^(http.+)\/|^(D\d+)/);
		 }
		 else {
			uid_info['did'] = 'local';
		 }
		if(typeof(tmp3)!=='undefined' && tmp3!==null){
			 uid_info['ms'] = tmp3[0];
		}
		else {
			 uid_info['ms'] = 'http://root.s3db.org/';
		}
		 
		 //now resolve only the uid part
		 if(tmp2[1] && tmp2[2]){
			uid_info['origin'] = uid;
			uid_info['letter'] = tmp2[1];
			uid_info['uid'] = tmp2[0];
			uid_info['s3_id'] = tmp2[2];
		 }
		
			
		 
		 
	return uid_info;
}
