///////////////////////////////// S3DBDOC ////////////////////////
//﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
// JONAS S ALMEIDA, October 2009﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
//﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
// This application is where I learned my javascript so beware﻿  //
// of all sorts of experimentation with calling functions and﻿  //
// instantiating classes as new objects + playing with events.﻿  //
//﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
// I don't write js code like this anymore.﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
//﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
// You were warned :-)﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
//﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //
//////////////////////////////////////////////////////////////////

s3db();
//s3d_load_search ();
s3db_login_table ();

// --- S3DB OBJECT ---
/*s3db = new Object; // maybe function s3db() {} would be just as good
s3db.id="s3db";
s3db.config = new Object; // Keep configuration information for access
s3db.config.timeout_external=2000; // configuration for waiting for a server to respond
s3db.config.timeout_internal=0; // configuration for internal operation to take place
*/
function s3db () {
﻿  s3db.id = 's3db';
﻿  s3db.config={"timeout_internal":1000,"timeout_external":10000,"fontFamily":"Verdana","fontSize_big":14,"fontSize_med":12,"fontSize_small":10};
﻿  s3db.state={"P":[],"C":[],"I":[],"S":[]};
﻿  s3db.U = new Array;
﻿  s3db.browse = [];
﻿  s3db.search=s3db_search();
﻿  return false;
}

// --- LOGIN TABLE ---

function s3db_login_table () {
﻿  // create login table on the dom first
﻿  var s3db_div = document.createElement('div');
﻿  s3db_div.id="s3db_div";
﻿  s3db_div.appendChild(s3db_table('s3db_login',4,4));
﻿  document.body.appendChild(s3db_div);
﻿  document.getElementById('s3db_login_2_2').innerHTML = "<input id='login_url' type='text' style='width:200;color:blue' onkeyup=\"s3db_events(event,'login_url','s3db_login_1_2')\" >"; // <-- URL here
﻿  if (s3db.search.url) {document.getElementById('login_url').value=s3db.search.url;s3db_check_url(document.getElementById('login_url').value,'s3db_login_1_2')};
﻿  document.getElementById('s3db_login').style.fontFamily="verdana";
﻿  document.getElementById('s3db_login').style.fontSize=12;
﻿  document.getElementById('s3db_login_1').style.fontSize=10;
﻿  document.getElementById('s3db_login_4').style.fontSize=10;
﻿  document.getElementById('s3db_login_4').style.color="gray";
﻿  // Top header
﻿  document.getElementById('s3db_login_1_1').innerHTML ="<a id='s3db_reset' href='javascript:onclick=window.location.reload()' style='color:black'>reset</a>";
﻿  document.getElementById('s3db_login_1_2').innerHTML = "Deployment URL";
﻿  // Input URL
﻿  document.getElementById('s3db_login_2_1').innerHTML = "S3DB:";
﻿  document.getElementById('s3db_login_4_2').innerHTML = "type of paste URL,<br> then press Enter";
﻿  document.getElementById('s3db_login_4_2').vAlign="top";
﻿  //document.getElementById('s3db_login_4_2').align="center";
﻿  document.getElementById('login_url').focus();
﻿  return false
}

// --- S3DB EVENTS ---

function s3db_events(evt,opt,more) {
﻿  //s3db.evt=evt;
﻿  switch (opt) {
﻿  ﻿  case 'login_url':
﻿  ﻿  ﻿  switch (evt.keyCode) {
﻿  ﻿  ﻿  ﻿  case 13:
﻿  ﻿  ﻿  ﻿  ﻿  s3db_check_url(document.getElementById('login_url').value,more);
﻿  ﻿  ﻿  ﻿  break;﻿  ﻿  ﻿  
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'login_key':
﻿  ﻿  ﻿  switch (evt.keyCode) {
﻿  ﻿  ﻿  ﻿  case 13:
﻿  ﻿  ﻿  ﻿  ﻿  s3db_check_key(document.getElementById('login_key').value,more);
﻿  ﻿  ﻿  ﻿  break;﻿  ﻿  ﻿  
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'login_uname_passwd':
﻿  ﻿  ﻿  switch (evt.keyCode) {
﻿  ﻿  ﻿  ﻿  case 13:
﻿  ﻿  ﻿  ﻿  ﻿  s3db_key_retrieve_now(document.getElementById('login_uname').value,document.getElementById('login_passwd').value);
﻿  ﻿  ﻿  ﻿  break;﻿  ﻿  ﻿  
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_over_project':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="blue";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="yellow";
﻿  ﻿  ﻿  //Pid=more.match(/\d+/g);
﻿  ﻿  ﻿  Pid=more;
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="<span style='color:maroon;font-size:"+s3db.config.fontSize_small+"'>["+s3db.P[Pid].uid.replace(/\|/g,"")+"] "+s3db.P[Pid].description+"</span>";
﻿  ﻿  ﻿  //s3db.more=more;
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_out_project':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="maroon";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="white";
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'click_project':
﻿  ﻿  ﻿  Pid=more;
﻿  ﻿  ﻿  document.getElementById('div_collections').innerHTML="<span style='color:red'>loading ...</span>"; // Clear list of colletions
﻿  ﻿  ﻿  document.getElementById('div_items').innerHTML=""; // and items too
﻿  ﻿  ﻿  document.getElementById('div_panel').innerHTML="";
﻿  ﻿  ﻿  document.getElementById('span_items').innerHTML="Items()";
﻿  ﻿  ﻿  document.getElementById('span_projects').innerHTML="Projects["+Pid+"]";
﻿  ﻿  ﻿  this.id=Pid;
﻿  ﻿  ﻿  s3db.load_collections(Pid,("s3db.load_collections_gui('"+Pid+"');"));
﻿  ﻿  ﻿  s3db.load_rules_project(Pid);
﻿  ﻿  ﻿  for (x in s3db.P) {
﻿  ﻿  ﻿  ﻿  if (x.match(Pid)) {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Pid).onmouseout=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Pid).onmouseover=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="red";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onclick = function () {s3db_events("","click_project",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseover = function () {s3db_events("","mouse_over_project",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseout = function () {s3db_events("","mouse_out_project",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="maroon";
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.backgroundColor="white";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  s3db.load_rules_project(Pid);
﻿  ﻿  ﻿  // Change events to reflect the selection
﻿  ﻿  ﻿  //alert(4);
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_over_collection':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="blue";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="yellow";
﻿  ﻿  ﻿  //Pid=more.match(/\d+/g);
﻿  ﻿  ﻿  Cid=more;
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="<span style='color:navy;font-size:"+s3db.config.fontSize_small+"'>["+s3db.P[s3db.state.P].C[Cid].uid.replace(/\|/g,"")+"] "+s3db.P[s3db.state.P].C[Cid].notes+"</span>";
﻿  ﻿  ﻿  //s3db.more=more;
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_out_collection':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="navy";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="white";
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'click_collection':﻿  ﻿  ﻿  
﻿  ﻿  ﻿  Cid=more;
﻿  ﻿  ﻿  document.getElementById('div_items').innerHTML="<span style=color:red>loading ...</span>";
﻿  ﻿      document.getElementById('span_items').innerHTML="Items(<span style=color:red>...</span>)";
﻿  ﻿  ﻿  document.getElementById('span_collections').innerHTML="Collections["+Cid+"]";
﻿  ﻿  ﻿  s3db.state.C=more;
﻿  ﻿  ﻿  Pid=s3db.state.P;
﻿  ﻿  ﻿  this.id=Cid;
﻿  ﻿  ﻿  for (x in s3db.P[Pid].C) {
﻿  ﻿  ﻿  ﻿  if (x.match(Cid)) {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Cid).onmouseout=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Cid).onmouseover=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="red";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onclick = function () {s3db_events("","click_collection",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseover = function () {s3db_events("","mouse_over_collection",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseout = function () {s3db_events("","mouse_out_collection",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="navy";
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.backgroundColor="white";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  s3db.rule_browser(Pid,Cid);
﻿  ﻿  ﻿  s3db.load_items(Pid,Cid,("s3db.load_items_gui('"+Cid+"')"));
﻿  ﻿  ﻿  // Change events to reflect the selection
﻿  ﻿  ﻿  //alert(4);
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_over_item':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  Iid = more;
﻿  ﻿  ﻿  document.getElementById(more).style.color="red";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="yellow";
﻿  ﻿  ﻿  //Pid=more.match(/\d+/g);
﻿  ﻿  ﻿  Cid=more;
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="<span style='color:green;font-size:"+s3db.config.fontSize_small+"'>["+s3db.P[s3db.state.P].C[s3db.state.C].I[Iid].uid.replace(/\|/g,"")+"] created by "+s3db.find_U("U"+s3db.P[s3db.state.P].C[s3db.state.C].I[Iid].created_by)+"</span>";
﻿  ﻿  ﻿  //s3db.more=more;
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_out_item':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="green";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="white";
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'click_item':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  Iid=more;
﻿  ﻿  ﻿  document.getElementById('span_items').innerHTML="Items["+Cid+"]";
﻿  ﻿  ﻿  document.getElementById('div_panel').innerHTML="<span style=color:red>loading ...</span>";
﻿  ﻿      //document.getElementById('span_items').innerHTML="Items(<span style=color:red>...</span>)";
﻿  ﻿  ﻿  //document.getElementById('span_collections').innerHTML="Collections["+Cid+"]";
﻿  ﻿  ﻿  s3db.state.I=Iid;
﻿  ﻿  ﻿  Pid=s3db.state.P;
﻿  ﻿  ﻿  Cid=s3db.state.C;
﻿  ﻿  ﻿  this.id=Iid;
﻿  ﻿  ﻿  for (x in s3db.P[Pid].C[Cid].I) {
﻿  ﻿  ﻿  ﻿  if (x.match(Iid)) {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Iid).onmouseout=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(Iid).onmouseover=null;
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="red";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onclick = function () {s3db_events("","click_item",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseover = function () {s3db_events("","mouse_over_item",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).onmouseout = function () {s3db_events("","mouse_out_item",this.id);return false}
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.color="green";
﻿  ﻿  ﻿  ﻿  ﻿  document.getElementById(x).style.backgroundColor="white";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  s3db.load_statements(Pid,Cid,Iid,("s3db.load_statements_gui('"+Iid+"')"));
﻿  ﻿  ﻿  //s3db.load_statements(Pid,Cid,Iid,"");
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_over_statement':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  Sid = more;
﻿  ﻿  ﻿  document.getElementById(more).style.color="red";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="yellow";
﻿  ﻿  ﻿  //Pid=more.match(/\d+/g);
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="<span style='color:green;font-size:"+s3db.config.fontSize_small+"'>["+s3db.P[s3db.state.P].C[s3db.state.C].I[Iid].uid.replace(/\|/g,"")+"] created by "+s3db.find_U("U"+s3db.P[s3db.state.P].C[s3db.state.C].I[Iid].created_by)+"</span>";
﻿  ﻿  ﻿  //s3db.more=more;
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'mouse_out_statement':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  document.getElementById(more).style.color="green";
﻿  ﻿  ﻿  document.getElementById(more).style.backgroundColor="white";
﻿  ﻿  ﻿  break;
﻿  ﻿  case 'edit_statement':
﻿  ﻿  ﻿  //s3db.evt=evt;
﻿  ﻿  ﻿  //alert(evt.keyCode);
﻿  ﻿  ﻿  if (!evt.keyCode) {// if this is an onchange, when the object is an item﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  document.getElementById(more).style.borderColor='red';
﻿  ﻿  ﻿  ﻿  document.getElementById(more).style.color='red';
﻿  ﻿  ﻿  ﻿  var Sid=more.match(/[^_]+/g);Sid=Sid[0];
﻿  ﻿  ﻿  ﻿  s3db.update_statement(Sid);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else if (evt.keyCode!=13 & evt.keyCode!=9 & evt.keyCode!=17 & evt.keyCode!=65 & evt.keyCode!=67) { // except if it is a Tab
﻿  ﻿  ﻿  ﻿  document.getElementById(more).style.color="red";
﻿  ﻿  ﻿  ﻿  document.getElementById(more).style.borderColor='red';
﻿  ﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="Pressing enter will update this value";
﻿  ﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').style.color="red";
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else if (evt.keyCode==13) {
﻿  ﻿  ﻿  ﻿  var Sid=more.match(/[^_]+/g);Sid=Sid[0];
﻿  ﻿  ﻿  ﻿  s3db.update_statement(Sid);
﻿  ﻿  ﻿  ﻿  }﻿  ﻿  ﻿  
﻿  ﻿  ﻿  break;
﻿  }
﻿  return false;
}

// --- S3DB.URL ---
function s3db_check_url (url,msg_id) {
﻿  // check url and report progress at msg_id
﻿  document.getElementById(msg_id).innerHTML="<span style='color:blue'>trying to connect ... </span>";
﻿  var s3q=(url + "/URI.php?format=json");
﻿  s3db.url=url;
﻿  s3db_json_read(s3q,"checking_login_url",("s3db_check_url_success('"+msg_id+"')"));
﻿  setTimeout(("if (!s3db.uid) {s3db_check_url_failure('"+msg_id+"')}"),s3db.config.timeout_external) ;
﻿  return false;
}
function s3db_check_url_success (msg_id) {
﻿  s3db.uid=s3db_json.ans[0].uid;
﻿  document.getElementById(msg_id).innerHTML="<span style='color:green'>"+s3db.uid+"</span>";
﻿  document.getElementById('s3db_login_2_3').innerHTML = "<input id='login_key' type='password' style='width:0;color:blue' onkeyup=\"s3db_events(event,'login_key','s3db_login_1_3')\">";// <-- login key here
﻿  if (s3db.search.key) {document.getElementById('login_key').value=s3db.search.key;s3db_check_key(document.getElementById('login_key').value,'s3db_login_1_3')};
﻿  s3db_width_slide ('login_key',100);
﻿  document.getElementById('s3db_login_1_3').innerHTML = "Access Key";
﻿  document.getElementById('s3db_login_4_3').innerHTML ="paste or type Key,<br> then press Enter";
﻿  document.getElementById('login_key').focus();
﻿  document.getElementById('s3db_login_2_2').innerHTML=s3db.url;
﻿  document.getElementById('s3db_login_2_2').style.color="blue";
﻿  document.getElementById('s3db_login_2_2').style.fontStyle="italic";
﻿  return false;
}
function s3db_check_url_failure (msg_id) {
﻿  document.getElementById(msg_id).innerHTML="<span style='color:red'>S3DB not found at this address </span>";
﻿  return false;
}

// --- S3DB KEY ---
function s3db_check_key (key,msg_id) {
﻿  document.getElementById(msg_id).innerHTML="<span style='color:blue'>matching key ... </span>";
﻿  var s3q=(s3db.url + "/URI.php?format=json&key="+key);
﻿  s3db.key=key;
﻿  s3db_json_read(s3q,"checking_login_url",("s3db_check_key_success('"+msg_id+"')"));
﻿  //setTimeout(("if (!s3db.Uinfo) {s3db_check_key_failure('"+msg_id+"')}"),s3db.config.timeout_external) ;
﻿  return false;
}
function s3db_check_key_success (msg_id) {
﻿  if (s3db_json.ans[0].error_code) {
﻿  ﻿  s3db_check_key_failure(msg_id);
﻿  }
﻿  else {
﻿  ﻿  s3db.Uinfo=s3db_json.ans[0];
﻿  ﻿  document.getElementById('s3db_login_2_3').innerHTML="<span style='color:blue'> ( <i>"+s3db.Uinfo.account_uname+"</i> )";
﻿  ﻿  document.getElementById(msg_id).innerHTML="<span style='color:green'>  User found</span>";
﻿  ﻿  s3db.uid=s3db.Uinfo.uid;
﻿  ﻿  document.getElementById('s3db_login_1_2').innerHTML="<span style='color:green'>"+s3db.uid+"</span>";
﻿  ﻿  document.getElementById('s3db_login_2_1').innerHTML="<input id='login_button' value='"+s3db.uid+"' type='button' onclick='s3db_methods();s3db_gui_init()'>";
﻿  ﻿  document.getElementById('s3db_login_4_1').innerHTML="click to enter<br>deployment";
﻿  ﻿  document.getElementById('s3db_login_4_2').innerHTML="";
﻿  ﻿  document.getElementById('s3db_login_4_3').innerHTML="";
﻿  ﻿  document.getElementById('s3db_login_1_1').innerHTML="";
﻿  ﻿  document.getElementById('s3db_login_1_2').innerHTML="";
﻿  ﻿  document.getElementById('s3db_login_1_3').innerHTML="";
﻿  ﻿  document.getElementById('login_button').focus();
﻿  }
}
function s3db_check_key_failure (msg_id) {
﻿  document.getElementById('s3db_login_1_3').innerHTML="<span style='color:red'>Key not found!</span>";
﻿  document.getElementById('s3db_login_4_3').innerHTML="<span style='color:red'>do you want to<br><a href='javascript:s3db_login_key_retrieve()'>retrieve a key</a>?</span>";
}
function s3db_login_key_retrieve () {
﻿  document.getElementById('s3db_login_3_2').innerHTML = "<input id='login_uname' type='text' style='width:200;color:blue' onkeyup=\"s3db_events(event,'login_uname_passwd')\">";
﻿  document.getElementById('s3db_login_4_2').innerHTML ="paste or type your username, ";
﻿  document.getElementById('s3db_login_3_3').innerHTML = "<input id='login_passwd' type='password' style='width:100;color:blue' onkeyup=\"s3db_events(event,'login_uname_passwd')\">";
﻿  document.getElementById('s3db_login_4_3').innerHTML ="then paste or type<br> your password here,<br> and press Enter";
﻿  document.getElementById('login_uname').focus();
}
function s3db_key_retrieve_now (uname,passwd) {
﻿  var s3q=(s3db.url + "/apilogin.php?username=" + uname + "&password=" + passwd + "&format=json");
﻿  document.getElementById('s3db_login_1_3').innerHTML="<span style='color:blue'>searching for user ...</span>";
﻿  s3db_json_read(s3q,"checking_login_url",("s3db_key_retrieve_now_success()"));
﻿  //setTimeout(("if (s3db_json.done==1) {s3db_key_retrieve_now_failure()}"),s3db.config.timeout_external);
}
function s3db_key_retrieve_now_success () {
﻿  if (s3db_json.ans[0].error_code) {s3db_key_retrieve_now_failure ();}
﻿  else {s3db_check_key (s3db.key=s3db_json.ans[0].key_id,"s3db_login_1_3");﻿  ﻿  
﻿  ﻿  document.getElementById('s3db_login_3_2').innerHTML="";
﻿  ﻿  document.getElementById('s3db_login_3_3').innerHTML="";
﻿  ﻿  setTimeout(("if (document.getElementById('s3db_login_4_2')){document.getElementById('s3db_login_4_2').innerHTML=\"<span style='color:green'>Key used: ["+s3db.key+"]</span>\"};"),s3db.config.timeout_external);
﻿  }
﻿  return false;
}
function s3db_key_retrieve_now_failure () {
﻿  document.getElementById('s3db_login_1_3').innerHTML="<span style='color:red'>User not found!</span>";
﻿  return false;
}

// --- MIS ---
function s3db_width_slide (target_id,maxW) {
﻿  for (var i=1; i<maxW; i++) {setTimeout(("document.getElementById('"+target_id+"').style.width="+i+";"),i)};
﻿  return false;
}
function s3db_table (id,n,m) {
﻿  var tb = document.createElement('table');
﻿  tb.id=id;
﻿  var tbh = document.createElement('thead');
﻿  tbh.id=(id+'_thead');
﻿  tb.appendChild(tbh);
﻿  var tbd = document.createElement('tbody');
﻿  tbd.id=(id+'_tbody');
﻿  for (var i=1; i<=n; i++) {
﻿  ﻿  var tr = document.createElement('tr');
﻿  ﻿  tr.id=(id+'_'+i);﻿  ﻿  
﻿  ﻿  for (var j=1; j<=m; j++) {
﻿  ﻿  ﻿  var td = document.createElement('td');
﻿  ﻿  ﻿  td.id=(id+'_'+i+'_'+j);
﻿  ﻿  ﻿  tr.appendChild(td);
﻿  ﻿  }
﻿  ﻿  tbd.appendChild(tr);
﻿  }
﻿  tb.appendChild(tbd);
﻿  tb.style.fontFamily=s3db.config.fontFamily;
﻿  tb.style.fontSize=s3db.config.fontSize_med;
﻿  return tb;
}

function s3db_search() {
﻿  var target=new Array;
﻿  var parms=document.location.search.match(/[^?&=]+/g);
﻿  // if there is anything there load all attribute/value pairs
﻿  if (parms){for (var i=0;i<parms.length;i=i+2){target[parms[i]]=parms[i+1]}}
﻿  return target
}
// --- MATRIX FUNCTIONS ---

function s3db_matrix (id) {
﻿  this.id=id;
﻿  this.values = new Array;
﻿  this.size = new Array;
﻿  //this.dims = this.size.length;
﻿  this.struct2cell = function (struct,fields) {
﻿  ﻿  this.size[0] = struct.length;
﻿  ﻿  this.size[1] = fields.length;
﻿  ﻿  // create values vector
﻿  ﻿  for (var i=0; i<this.size[0]; i++) {
﻿  ﻿  ﻿  for (var j=0; j<this.size[1]; j++) {
﻿  ﻿  ﻿  ﻿  //this.values[i+j*this.size[0]]=[i,j];
﻿  ﻿  ﻿  ﻿  eval("this.values[i+j*this.size[0]]=struct[i]."+fields[j]);
﻿  ﻿  ﻿  }
﻿  ﻿  };
﻿  return this.values};
﻿  this.cell2html = function  (id) {
﻿  ﻿  if (!id) {id = this.id};
﻿  ﻿  // Creates HTML table
﻿  ﻿  var html = "<table id='"+id+"'>";
﻿  ﻿  for (var i=0; i<this.size[0]; i++) {
﻿  ﻿  ﻿  html=html+"<tr id='"+id+"_"+(i+1)+"'>";
﻿  ﻿  ﻿  for (var j=0; j<this.size[1]; j++) {
﻿  ﻿  ﻿  ﻿  html=html+"<td id='"+id+"_"+(i+1)+"_"+(j+1)+"'>";
﻿  ﻿  ﻿  ﻿  html=html+this.values[i+j*this.size[0]];
﻿  ﻿  ﻿  ﻿  html=html+"</td>";
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  html=html+"</tr>";
﻿  ﻿  };
﻿  ﻿  html=html+"</table>";
﻿  ﻿  this.html=html;
﻿  ﻿  return html;
﻿  }

}

function s3db_array_extract (target,field,value) {
﻿  y= new Array;
﻿  for (var x in target) {if (target[x][field].match(value)) {y[x]=target[x]}}
﻿  return y}
function s3db_array_count (X) {var j=0;for (x in X) {j=j+1};return j}
function s3db_array_merge (X,Y) {
﻿  Z= new Array;
﻿  for (x in X){Z[x]=X[x]};
﻿  for (y in Y){Z[y]=Y[y]};
﻿  return Z}

// --- S3DB GUI ---
// Initialization S3DB right after authetication is finished
function s3db_gui_init () {
﻿  // Prepare GUI
﻿  document.getElementById('s3db_div').appendChild(s3db_table('s3db_envelope',3,1)); // GUI envelope
﻿  document.getElementById('s3db_div').removeChild(document.getElementById('s3db_login')); // remove old login table
﻿  document.getElementById('s3db_envelope_1_1').innerHTML="<span id='login_info' style='font-size:"+s3db.config.fontSize_small+"'>["+s3db.uid.replace(/\|/g,"")+"] ("+s3db.url+" | "+s3db.Uinfo.account_uname+") <a href='javascript:onclick=window.location.reload()'>log out</a></span><p id='s3db_states'><span id='span_projects' style='color:maroon'>Projects()</span>.<span id='span_collections' style='color:navy'>Collections()</span>.<span id='span_items' style='color:green'>Items()</span></p>";
﻿  document.getElementById('s3db_states').style.fontStyle='italic';
﻿  //document.getElementById('s3db_envelope_1_1').style.fontSize=s3db.config.fontSize_small;
﻿  //document.getElementById('s3db_envelope_1_1').style.textAlign="right";
﻿  document.getElementById('s3db_envelope_2_1').appendChild(s3db_table('s3db_body',1,3)); // GUI body
﻿  document.getElementById('s3db_body').style.borderStyle='solid';
﻿  document.getElementById('s3db_body').style.borderColor='silver';
    // FIRST ROW - PROJECTS AND COLLECTIONS
﻿  document.getElementById('s3db_body_1_1').innerHTML="<div id='div_projects'></div><div id='div_collections'></div></p>";
﻿  document.getElementById('s3db_body_1_1').style.verticalAlign='top';
﻿  document.getElementById('div_projects').style.height=150;
﻿  document.getElementById('div_projects').style.width=200;
﻿  document.getElementById('div_projects').style.overflow='scroll';
﻿  document.getElementById('div_projects').innerHTML="<span style='color:red'>loading ...</span>";
﻿  //document.getElementById('div_projects').style.borderStyle='solid'
﻿  document.getElementById('div_collections').style.height=250;
﻿  document.getElementById('div_collections').style.width=200;
﻿  document.getElementById('div_collections').style.overflow='scroll';
﻿  document.getElementById('div_collections').color="navy";
﻿  //document.getElementById('div_collections').style.borderStyle='solid';
﻿  // SECOND ROW - ITEMS
﻿  document.getElementById('s3db_body_1_2').innerHTML="<div id='div_items'></div>";
﻿  document.getElementById('s3db_body_1_2').style.verticalAlign='top';
﻿  document.getElementById('div_items').style.height=400;
﻿  //document.getElementById('div_items').style.width=300;
﻿  document.getElementById('div_items').style.overflow='scroll';
﻿  // THIRD ROW - PANEL
﻿  document.getElementById('s3db_body_1_3').innerHTML="<div id='div_panel'></div>";
﻿  document.getElementById('s3db_body_1_3').style.verticalAlign='top';
﻿  document.getElementById('div_panel').style.height=400;
﻿  //document.getElementById('div_panel').style.width=400;
﻿  document.getElementById('div_panel').style.overflow='scroll';
﻿  //var frm_projects = document.createElement('iframe');
﻿  //frm_projects.id = "iframe_projects";
﻿  //document.getElementById('span_projects').appendChild(frm_projects);
﻿  //var frm_collections = document.createElement('iframe');
﻿  //frm_collections.id = "iframe_collections";
﻿  //document.getElementById('span_collections').appendChild(frm_collections);
﻿  // Read list of projects
﻿  s3db.load_projects('s3db.gui_list_projects()');
﻿  return false;
﻿  //Load projects in
﻿  //s3db.gui_projects();
}
// --- S3DB METHODS ---
function s3db_methods () {
﻿  // load methods into s3db
﻿  s3db.load_projects = function  (next_eval) {
﻿  ﻿  //s3db.load_projects.json_read = function (x,y,z) {s3db_json_read(x,y,z)};
﻿  ﻿  //s3db.load_projects.json_read((s3db.url+"/S3QL.php?format=json&key="+s3db.key),'load_projects',('s3db.P=s3db_json.ans;'+next_eval));
﻿  ﻿  s3db_json_read((s3db.url+"/S3QL.php?format=json&key="+s3db.key),'load_projects',('s3db.load_projects_index(ans);'+next_eval));
﻿  ﻿  return false};
﻿  s3db.load_projects_index = function (ans) {
﻿  ﻿  //s3db.P=ans;
﻿  ﻿  s3db.P = new Array;
﻿  ﻿  for (x in ans) {
﻿  ﻿  ﻿  s3db.P["P"+ans[x].project_id]=ans[x];
﻿  ﻿  }
﻿  ﻿  return false;
﻿  }
﻿  // builds project list in HTML GUI
﻿  s3db.gui_list_projects = function () {
﻿  ﻿  document.getElementById('div_projects').innerHTML=""; // Clear list of projetcs
﻿  ﻿  n=0;for(x in s3db.P){n=n+1};document.getElementById('span_projects').innerHTML="Projects("+n+")";
﻿  ﻿  var tb = document.createElement('table');
﻿  ﻿  var tbd = document.createElement('tbody');
﻿  ﻿  tb.id="list_of_projects";
﻿  ﻿  tb.style.fontSize=s3db.config.fontSize_med;
﻿  ﻿  tb.appendChild(tbd);
﻿  ﻿  document.getElementById('div_projects').appendChild(tb);
﻿  ﻿  for (Pid in s3db.P) {
﻿  ﻿  ﻿  var tr = document.createElement('tr');tr.id = Pid;
﻿  ﻿  ﻿  tr.style.color="maroon";
﻿  ﻿  ﻿  tr.onclick = function () {s3db_events("","click_project",this.id);return false}
﻿  ﻿  ﻿  tr.onmouseover = function () {s3db_events("","mouse_over_project",this.id);return false}
﻿  ﻿  ﻿  tr.onmouseout= function () {s3db_events("","mouse_out_project",this.id);return false}
﻿  ﻿  ﻿  var evt = "onmouseover=\"s3db_events(event,'mouse_over_project','"+Pid+"')\" onmouseout=\"s3db_events(event,'mouse_out_project','"+Pid+"')\" onclick=\"s3db_events(event,'click_project','"+Pid+"')\"";
﻿  ﻿  ﻿  var td1 = document.createElement('td');
﻿  ﻿  ﻿  //td1.innerHTML="<span "+evt+">"+Pid+"</span>";
﻿  ﻿  ﻿  td1.innerHTML=Pid;
﻿  ﻿  ﻿  td1.style.fontSize=s3db.config.fontSize_small;
﻿  ﻿  ﻿  td1.style.textAlign="right";
﻿  ﻿  ﻿  var td2 = document.createElement('td');
﻿  ﻿  ﻿  //td2.innerHTML="<span "+evt+">"+s3db.P[Pid].name+"</span>";
﻿  ﻿  ﻿  td2.innerHTML=s3db.P[Pid].name;
﻿  ﻿  ﻿  tr.appendChild(td1);
﻿  ﻿  ﻿  tr.appendChild(td2);
﻿  ﻿  ﻿  tbd.appendChild(tr);
﻿  ﻿  };
﻿  ﻿  //s3db.tb=tb;
﻿  ﻿  return false};
﻿  s3db.load_collections = function (Pid,next_eval) {
﻿  ﻿  s3db.state.P=Pid;//alert("496: "+Pid);
﻿  ﻿  s3db.state.C=[];
﻿  ﻿  s3db.state.I=[];
﻿  ﻿  s3db.state.S=[];
﻿  ﻿  if (!s3db.P[Pid].C) {
﻿  ﻿  ﻿  //var s3q=s3db.url + "/S3QL.php?format=json&key="+s3db.key+"&query=<S3QL><select>*</select><from>collections</from><where><project_id>"+Pid.match(/\d+/g)+"</project_id></where></S3QL>";
﻿  ﻿  ﻿  //s3db_json_read(s3q,'load_collections',("s3db.load_collections_index('"+Pid+"',ans);"+next_eval));
﻿  ﻿  ﻿  var s3q=s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>collections</from><where><project_id>"+Pid.match(/\d+/g)+"</project_id></where></S3QL>";
﻿  ﻿  ﻿  //s3db_jsonp(s3q,("s3db.load_collections_index('"+Pid+"',ans);"+next_eval));
﻿  ﻿  ﻿  //s3db_jsonp_call(s3q,("alert("+Pid.match(/\d+/g)+")"));
﻿  ﻿  ﻿  //s3db_jsonp_call(s3q,("alert("+P126+")"));alert("507");
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.load_collections_index('"+Pid+"',ans);"+next_eval));
﻿  ﻿  ﻿  //s3db_jsonp_call(s3q,("s3db.load_collections_index("+Pid.match(/\d+/g)+",ans);"+next_eval));
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿  ﻿  eval(next_eval);
﻿  ﻿  }
﻿  ﻿  //Load rules too:
﻿  ﻿  /*if (!s3db.P[Pid].R) {
﻿  ﻿  ﻿  var s3q=s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>rules</from><where><project_id>"+Pid.match(/\d+/g)+"</project_id></where></S3QL>";
﻿  ﻿  ﻿  s3db_jsonp(s3q,("s3db.load_rules_index('"+Pid+"',ans);"+next_eval));
﻿  ﻿  }
﻿  ﻿  */
﻿  ﻿  return false;
﻿  }
﻿  s3db.load_collections_index = function (Pid,ans) {
﻿  ﻿  //alert("520: "+Pid);
﻿  ﻿  C = new Array;
﻿  ﻿  for (x in ans) {
﻿  ﻿  ﻿  ans[x].length_I="+";
﻿  ﻿  ﻿  C["C"+ans[x].collection_id]=ans[x];
﻿  ﻿  }
﻿  ﻿  s3db.P[Pid].C = C;
﻿  ﻿  s3db.P[Pid].length_C=ans.length;
﻿  ﻿  delete(C);
﻿  ﻿  return false;
﻿  }
﻿  s3db.load_collections_gui = function (Pid) {
﻿  ﻿  document.getElementById('div_collections').innerHTML=""; // clean pre-existing list if any
﻿  ﻿  n=0;for(x in s3db.P[Pid].C){n=n+1};document.getElementById('span_collections').innerHTML="Collections("+n+")";
﻿  ﻿  var tb = document.createElement('table');
﻿  ﻿  var tbd = document.createElement('tbody');
﻿  ﻿  tb.id="list_of_collections";
﻿  ﻿  tb.style.fontSize=s3db.config.fontSize_med;
﻿  ﻿  tb.appendChild(tbd);
﻿  ﻿  document.getElementById('div_collections').appendChild(tb);
﻿  ﻿  for (Cid in s3db.P[Pid].C) {
﻿  ﻿  ﻿  var tr = document.createElement('tr');
﻿  ﻿  ﻿  tr.id = Cid;
﻿  ﻿  ﻿  tr.onclick = function () {s3db_events("","click_collection",this.id);return false}
﻿  ﻿  ﻿  tr.onmouseover = function () {s3db_events("","mouse_over_collection",this.id);return false}
﻿  ﻿  ﻿  tr.onmouseout= function () {s3db_events("","mouse_out_collection",this.id);return false}
﻿  ﻿  ﻿  tr.style.color="navy";
﻿  ﻿  ﻿  //var evt = "onmouseover=\"s3db_events(event,'mouse_over_collection','"+Cid+"')\" onmouseout=\"s3db_events(event,'mouse_out_collection','"+Cid+"')\" onclick=\"s3db_events(event,'click_collection','"+Cid+"')\"";
﻿  ﻿  ﻿  var td1 = document.createElement('td');
﻿  ﻿  ﻿  //td1.innerHTML="<span "+evt+">"+Cid+"</span>";
﻿  ﻿  ﻿  td1.innerHTML=Cid;
﻿  ﻿  ﻿  td1.style.fontSize=s3db.config.fontSize_small;
﻿  ﻿  ﻿  td1.style.textAlign="right";
﻿  ﻿  ﻿  var td2 = document.createElement('td');
﻿  ﻿  ﻿  td2.innerHTML=s3db.P[Pid].C[Cid].name+" ("+s3db.P[Pid].C[Cid].length_I+")";
﻿  ﻿  ﻿  tr.appendChild(td1);
﻿  ﻿  ﻿  tr.appendChild(td2);
﻿  ﻿  ﻿  tbd.appendChild(tr);
﻿  ﻿  };
﻿  ﻿  //s3db.tb=tb;
﻿  ﻿  return false};
﻿  s3db.load_items = function (Pid,Cid,next_eval,bg) {
﻿  ﻿  if (!s3db.P[Pid].C[Cid].I) {
﻿  ﻿  ﻿  document.getElementById(Cid).childNodes[1].innerHTML = s3db.P[Pid].C[Cid].name + " (*)";
﻿  ﻿  ﻿  var s3q=s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>items</from><where><collection_id>"+Cid.match(/\d+/g)+"</collection_id></where></S3QL>";
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.load_items_index('"+Cid+"',ans);"+next_eval));
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿  ﻿  eval(next_eval);
﻿  ﻿  }
﻿  ﻿  if (!bg) { // if this is not a background call
﻿  ﻿  ﻿  s3db.state.C=Cid;
﻿  ﻿  ﻿  s3db.state.I=[];
﻿  ﻿  ﻿  s3db.state.S=[];
﻿  ﻿  ﻿  }
﻿  ﻿  
﻿  ﻿  //alert(Pid+" | "+Cid)
﻿  ﻿  return false;}
﻿  
﻿  s3db.load_items_index = function (Cid,ans) {
﻿  ﻿  //alert(Cid);
﻿  ﻿  var Pid = s3db.state.P;
﻿  ﻿  var I = new Array;
﻿  ﻿  for (var x in ans) {
﻿  ﻿  ﻿  ans[x].length_S="+";
﻿  ﻿  ﻿  I["I"+ans[x].item_id]=ans[x];
﻿  ﻿  }
﻿  ﻿  s3db.P[Pid].C[Cid].I = I;
﻿  ﻿  s3db.P[Pid].C[Cid].length_I=ans.length;
﻿  ﻿  delete(I);
﻿  ﻿  // Add count to row in collection table
﻿  ﻿  document.getElementById(Cid).childNodes[1].innerHTML = s3db.P[Pid].C[Cid].name + " ("+(s3db.P[Pid].C[Cid].length_I)+")";
﻿  ﻿  return false;}
﻿  s3db.load_items_gui = function (Cid) {
﻿  ﻿  //alert(Cid);
﻿  ﻿  document.getElementById('div_items').innerHTML=""; // clean pre-existing list if any
﻿  ﻿  Pid=s3db.state.P;
﻿  ﻿  //var tb = document.createElement('table');
﻿  ﻿  //var tbd = document.createElement('tbody');
﻿  ﻿  var div=document.createElement('div');
﻿  ﻿  div.id="list_of_items";
﻿  ﻿  div.style.fontSize=s3db.config.fontSize_med;
﻿  ﻿  //tb.appendChild(tbd);
﻿  ﻿  document.getElementById('div_items').appendChild(div);
﻿  ﻿  var n = 0;for (var x in s3db.P[Pid].C[Cid].I){ n=n+1;};
﻿  ﻿  document.getElementById('span_items').innerHTML="Items("+n+")";
﻿  ﻿  if (n>0) {
﻿  ﻿  ﻿  for (var Iid in s3db.P[Pid].C[Cid].I) {
﻿  ﻿  ﻿  ﻿  var div_I = s3db.list_item(Iid);
﻿  ﻿  ﻿  ﻿  div.appendChild(div_I);
﻿  ﻿  ﻿  ﻿  //tr.appendChild(td2);
﻿  ﻿  ﻿  ﻿  //tbd.appendChild(tr);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  s3db.div_newI(div);}
﻿  ﻿  else {document.getElementById('div_items').innerHTML="<span style = 'color:green'>no items in this collection</span>";
﻿  ﻿  ﻿  s3db.div_newI(document.getElementById('div_items'))}
﻿  ﻿  // and one last div to add new Items
﻿  ﻿  
﻿  ﻿  return false;}

﻿  s3db.div_newI = function(div){ // the parent div
﻿  ﻿  if(document.getElementById('div_newI')){remove_element_by_id('div_newI')};
﻿  ﻿  var div_newI = document.createElement('div');
﻿  ﻿  div_newI.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="new_item" type=button value="add '+s3db.P[Pid].C[Cid].name+'">&nbsp;&nbsp;<span id="new_item_msg"></span>';
﻿  ﻿  div.appendChild(div_newI);
﻿  ﻿  div_newI.id='div_newI';
﻿  ﻿  div_newI.onclick = function () { // add new item
﻿  ﻿  ﻿  // remove button
﻿  ﻿  ﻿  remove_element_by_id("new_item");
﻿  ﻿  ﻿  // add new button
﻿  ﻿  ﻿  //s3db.div_newI(this.parentNode);
﻿  ﻿  ﻿  // insert new item
﻿  ﻿  ﻿  document.getElementById('new_item_msg').innerHTML='<span style=color:blue>&nbsp;&nbsp;&nbsp;inserting ...</span>';
﻿  ﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;
﻿  ﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><insert>item</insert><where><collection_id>"+Cid.slice(1,Cid.length)+"</collection_id></where></S3QL>";
﻿  ﻿  ﻿  //console.log(s3q);
﻿  ﻿  ﻿  var job = s3db.job('new_item_');
﻿  ﻿  ﻿  div_newI.id=job;
﻿  ﻿  ﻿  //console.log(job);
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.job['"+job+"']=ans;s3db.insert_item_success('"+Pid+"','"+Cid+"','"+job+"');"));
﻿  ﻿  ﻿  //setTimeout("if(!s3db.job."+job+"){document.getElementById('new_item_msg').innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;inserting ..... failed</span>'};",2000);
﻿  ﻿  ﻿  //setTimeout("if(s3db.job."+job+"){document.getElementById('new_item_msg').innerHTML='<span style=color:blue>&nbsp;&nbsp;&nbsp;done</span>'}",2000);//else{setTimeout(\"delete s3db.job['"+job+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);
﻿  ﻿  ﻿  }
﻿  ﻿  return false;
﻿  ﻿  }

﻿  s3db.insert_item_success = function (Pid,Cid,job) {
﻿  ﻿  var Iid = "I"+s3db.job[job][0].item_id;//lala = s3db.job[job];
﻿  ﻿  document.getElementById("new_item_msg").innerHTML="<span style=color:green>&nbsp;&nbsp;&nbsp;"+Iid+" inserted</span>";
﻿  ﻿  document.getElementById(job).id=Iid;
﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>items</from><where><item_id>"+Iid.slice(1,Iid.length)+"</item_id></where></S3QL>";
﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.P['"+Pid+"'].C['"+Cid+"'].I['"+Iid+"']=ans[0];s3db.load_items_gui('"+Cid+"')"));//;document.getElementById('new_item_msg').innerHTML=''"));//;document.getElementById('"+Iid+"_value').onclick()"));
﻿  ﻿  //s3db.div_newI(document.getElementById('div_newI'))
﻿  ﻿  delete s3db.job[job];
﻿  ﻿  //alert(Iid+'_id');
﻿  ﻿  setTimeout("document.getElementById('"+Iid+"_id').onclick()",300);
﻿  ﻿  return false}
﻿  
﻿  s3db.list_item = function (Iid) {
﻿  ﻿  if (document.getElementById(Iid)) {
﻿  ﻿  ﻿  div_I=document.getElementById(Iid);
﻿  ﻿  ﻿  div_I.innerHTML=''}
﻿  ﻿  else {var div_I = document.createElement('div');div_I.id = Iid;}
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;
﻿  ﻿  var span_Iid = document.createElement('span');
﻿  ﻿  span_Iid.id=Iid+'_id';
﻿  ﻿  span_Iid.innerHTML='<a id="'+Iid+'_id_a" href=#>'+Iid+'</a>';
﻿  ﻿  span_Iid.onclick = function () {s3db.edit_item(this.id);return false}
﻿  ﻿  span_Iid.style.color="green";
﻿  ﻿  span_Iid.style.fontSize=s3db.config.fontSize_small;
﻿  ﻿  span_Iid.style.textAlign="right";
﻿  ﻿  span_Iid.style.verticalAlign='top';
﻿  ﻿  var span_Ivalue = document.createElement('span');
﻿  ﻿  span_Ivalue.innerHTML=" ("+s3db.P[Pid].C[Cid].I[Iid].notes+") "+s3db.P[Pid].C[Cid].I[Iid].created_on.slice(0,10)+" ("+s3db.P[Pid].C[Cid].I[Iid].length_S+")";
﻿  ﻿  span_Ivalue.id=Iid+'_value';
﻿  ﻿  span_Ivalue.style.color="green";
﻿  ﻿  var span_Imsg = document.createElement('span');
﻿  ﻿  span_Imsg.id = Iid+'_msg';
﻿  ﻿  div_I.appendChild(span_Iid);
﻿  ﻿  div_I.appendChild(span_Ivalue);
﻿  ﻿  div_I.appendChild(span_Imsg);
﻿  ﻿  // events
﻿  ﻿  span_Ivalue.onclick = function () {
﻿  ﻿  ﻿  s3db.click_item(this);return false}
﻿  ﻿  span_Ivalue.onmouseover = function () {this.style.backgroundColor='yellow';return false}
﻿  ﻿  span_Ivalue.onmouseout= function () {
﻿  ﻿  ﻿  var Iid=s3db.state.I;var Iidi=this.id.match(/[^_]+/g);Iidi=Iidi[0];
﻿  ﻿  ﻿  if (Iidi!=Iid) {this.style.backgroundColor='white';}﻿  ﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  return false}
﻿  ﻿  return div_I}

﻿  s3db.click_item = function (that) {
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;
﻿  ﻿  document.getElementById('div_panel').innerHTML='<span style=color:red> loading ... </span>'
﻿  ﻿  var Iid = that.id.match(/[^_]+/g);
﻿  ﻿  Iid=Iid[0];s3db.state.I=Iid;
﻿  ﻿  for (var x in document.getElementById('list_of_items').childNodes) {
﻿  ﻿  ﻿  for (var y in document.getElementById('list_of_items').childNodes[x].childNodes){
﻿  ﻿  ﻿  ﻿  var z = document.getElementById('list_of_items').childNodes[x].childNodes;
﻿  ﻿  ﻿  ﻿  //console.log(z[1].id+' : '+this.id+' - '+Iid);
﻿  ﻿  ﻿  ﻿  if (z.length>1) {
﻿  ﻿  ﻿  ﻿  ﻿  if (z[1].id!==that.id) {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //console.log(this.id);
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  if (z[1].style) {z[1].style.color='green';z[1].style.backgroundColor='white'}
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  else {if (z[1].style){that.style.color='red';that.style.backgroundColor='yellow'}
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  s3db.load_statements(Pid,Cid,Iid,("s3db.load_statements_gui('"+Iid+"')"));
﻿  ﻿  return false}

﻿  s3db.edit_item = function (Iid) {
﻿  ﻿  var Pid = s3db.state.P;var Cid = s3db.state.C;
﻿  ﻿  if (Iid.slice(Iid.length-3,Iid.length)=='_id') {
﻿  ﻿  ﻿  Iid=Iid.slice(0,Iid.length-3);
﻿  ﻿  ﻿  }
﻿  ﻿  s3db.state.I=Iid;
﻿  ﻿  var Ii=s3db.P[Pid].C[Cid].I[Iid];
﻿  ﻿  document.getElementById(Iid).innerHTML='<a id="'+Iid+'_id_list" href=#>'+Iid+'</a>&nbsp;&nbsp;<input id="'+Iid+'_input" type=text value="'+Ii.notes+'" style=color:blue>&nbsp;&nbsp;<a id="'+Iid+'_del" href=# style=color:red>del</a><span id="'+Iid+'_msg"></span>';
﻿  ﻿  document.getElementById(Iid+'_del').onclick = function () {// delete an item and all of its contents
﻿  ﻿  ﻿  document.getElementById(Iid+"_msg").innerHTML="<span style=color:blue>&nbsp;&nbsp;&nbsp;deleting ... </span>";
﻿  ﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><delete>item</delete><where><item_id>"+Iid.slice(1,Iid.length)+"</item_id><flag>all</flag></where></S3QL>";
﻿  ﻿  ﻿  var job = s3db.job(Iid+'_delete_');
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.job['"+job+"']=ans;s3db.delete_item_success('"+Pid+"','"+Cid+"','"+Iid+"');"));
﻿  ﻿  ﻿  setTimeout("if(!s3db.job['"+job+"']){document.getElementById('"+Iid+"_msg').innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;deleting ... failed</span>'}else{setTimeout(\"delete s3db.job['"+job+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);
﻿  ﻿  ﻿  return false}
﻿  ﻿  document.getElementById(Iid+'_input').onclick = function (){s3db.click_item(this);return false}
﻿  ﻿  document.getElementById(Iid+'_input').onkeyup = function (ev) {
﻿  ﻿  ﻿  this.style.color='red';
﻿  ﻿  ﻿  var Iid=this.id.slice(0,this.id.length-6);//alert(Iid);
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').innerHTML="Pressing enter will update this value";
﻿  ﻿  ﻿  document.getElementById('s3db_envelope_3_1').style.color="red";
﻿  ﻿  ﻿  if (ev.keyCode==13) {// update item notes field
﻿  ﻿  ﻿  ﻿  document.getElementById(Iid+'_msg').innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;updating ... </span>'
﻿  ﻿  ﻿  ﻿  var value = document.getElementById(Iid+'_input').value
﻿  ﻿  ﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><update>item</update><where><item_id>"+Iid.slice(1,Iid.length)+"</item_id><notes>"+value+"</notes></where></S3QL>";
﻿  ﻿  ﻿  ﻿  var job = s3db.job(Iid+'_update_');
﻿  ﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.job['"+job+"']=ans;s3db.update_item_success('"+Pid+"','"+Cid+"','"+Iid+"','"+job+"','"+value+"');"));
﻿  ﻿  ﻿  ﻿  setTimeout("if(!s3db.job['"+job+"']){document.getElementById('"+Iid+"_msg').innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;updating ... failed</span>'}else{setTimeout(\"delete s3db.job['"+job+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);
﻿  ﻿  ﻿  ﻿  //console.log(s3q);
﻿  ﻿  ﻿  ﻿  }﻿  ﻿  ﻿  
﻿  ﻿  ﻿  return false}
﻿  ﻿  document.getElementById(Iid+'_id_list').onclick = function (){s3db.list_item(this.id.slice(0,this.id.length-8));return false}
﻿  ﻿  s3db.load_statements(Pid,Cid,Iid,("s3db.load_statements_gui('"+Iid+"')"));
﻿  ﻿  return false}
﻿  s3db.delete_item_success = function (Pid,Cid,Iid) {
﻿  ﻿  delete s3db.P[Pid].C[Cid].I[Iid];
﻿  ﻿  remove_element_by_id(Iid);
﻿  ﻿  return false}
﻿  s3db.update_item_success = function (Pid,Cid,Iid,job,value) {
﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].notes=value;
﻿  ﻿  s3db.list_item(Iid);
﻿  ﻿  document.getElementById(Iid+'_msg').innerHTML='<span style=color:navy>&nbsp;&nbsp;['+s3db.job[job][0].message+']</span>';
﻿  ﻿  //s3db.job[job][0].message
﻿  ﻿  //alert(job);
﻿  ﻿  return false}

﻿  s3db.load_statements = function  (Pid,Cid,Iid,next_eval) {
﻿  ﻿  //alert(Iid);
﻿  ﻿  s3db.state.I=Iid;
﻿  ﻿  s3db.state.S=[];
﻿  ﻿  if (!s3db.P[Pid].C[Cid].I[Iid].S) {
﻿  ﻿  ﻿  Ii = s3db.P[Pid].C[Cid].I[Iid];
﻿  ﻿  ﻿  document.getElementById(Iid).childNodes[1].innerHTML = "("+Ii.notes+") "+Ii.created_on.slice(0,10)+ " (*)";
﻿  ﻿  ﻿  var s3q=s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>statements</from><where><item_id>"+Iid.match(/\d+/g)+"</item_id></where></S3QL>";
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.load_statements_index('"+Iid+"',ans);"+next_eval));
﻿  ﻿  }
﻿  ﻿  else {
﻿  ﻿  ﻿  eval(next_eval);
﻿  ﻿  }
﻿  ﻿  return false};
﻿  s3db.reload_statements_Rid = function  (Pid,Cid,Rid,Iid,next_eval) {
﻿  ﻿  //alert(Iid);
﻿  ﻿  var s3q=s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><select>*</select><from>statements</from><where><item_id>"+Iid.match(/\d+/g)+"</item_id><rule_id>"+Rid.slice(1,Rid.length)+"</rule_id></where></S3QL>";
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.reload_statements_Rid_index('"+Pid+"','"+Cid+"','"+Rid+"','"+Iid+"',ans);"+next_eval));
﻿  ﻿  return false};
﻿  s3db.reload_statements_Rid_index = function (Pid,Cid,Rid,Iid,ans) {
﻿  ﻿  if (!s3db.P[Pid].C[Cid].I[Iid].S) {s3db.P[Pid].C[Cid].I[Iid].S = new Array}
﻿  ﻿  for (x in ans) {
﻿  ﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].S["S"+ans[x].statement_id]=ans[x];
﻿  ﻿  ﻿  }
﻿  ﻿  return false;}
﻿  s3db.load_statements_index = function (Iid,ans) {
﻿  ﻿  var Pid = s3db.state.P;
﻿  ﻿  var Cid = s3db.state.C;
﻿  ﻿  //R = new Array;
﻿  ﻿  var S = new Array;
﻿  ﻿  for (x in ans) {
﻿  ﻿  ﻿  S["S"+ans[x].statement_id]=ans[x];
﻿  ﻿  };
﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].length_S=ans.length;
﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].S = S;
﻿  ﻿  delete(S);
﻿  ﻿  //var Sstr = document.getElementById(Iid).childNodes[1].innerHTML;
﻿  ﻿  Ii = s3db.P[Pid].C[Cid].I[Iid];
﻿  ﻿  document.getElementById(Iid).childNodes[1].innerHTML = "("+Ii.notes+") "+Ii.created_on.slice(0,10)+ " ("+(ans.length)+")";
﻿  ﻿  return false;}
﻿  s3db.load_statements_gui = function (Iid) {
﻿  ﻿  document.getElementById('div_panel').innerHTML="";//Iid+" statements ...";
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  var div = document.createElement('div');
﻿  ﻿  div.id="list_of_statements";
﻿  ﻿  div.style.fontSize=s3db.config.fontSize_med;
﻿  ﻿  document.getElementById('div_panel').appendChild(div);
﻿  ﻿  //var n = s3db_array_count(s3db.P[Pid].C[Cid].I[Iid].S); // do I need this information?
﻿  ﻿  var whereSubject = s3db_array_extract(s3db.P[Pid].R,'subject_id',Cid.match(/\d+/g));
﻿  ﻿  for (Rid in whereSubject) {
﻿  ﻿  ﻿  var Ri=s3db.P[Pid].R[Rid];
﻿  ﻿  ﻿  var S = s3db_array_extract(s3db.P[Pid].C[Cid].I[Iid].S,'rule_id',Rid.match(/\d+/g));
﻿  ﻿  ﻿  var n = s3db_array_count(S);
﻿  ﻿  ﻿  var div_R = document.createElement('div')
﻿  ﻿  ﻿  div_R.id=Rid;
﻿  ﻿  ﻿  div_R.style.fontSize=s3db.config.fontSize_small;
﻿  ﻿  ﻿  div.appendChild(div_R);
﻿  ﻿  
﻿  ﻿  ﻿  if (!Ri.object_id|n==0) {// if object is a literal or there are no statements proceed
﻿  ﻿  ﻿  ﻿  s3db.load_statements_gui_Ri(Rid,S);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  div_R.innerHTML=Rid+": "+whereSubject[Rid].subject+" >("+whereSubject[Rid].verb+")><span style='color:blue'>"+whereSubject[Rid].object+"</span>&nbsp;<span style=color:red> loading instances ...</span>";
﻿  ﻿  ﻿  ﻿  var Pobj='P'+Ri.project_id;var Cobj='C'+Ri.object_id;
﻿  ﻿  ﻿  ﻿  if (!s3db.P[Pobj].C[Cobj].I) {//if Items of that class not loaded yet do it now
﻿  ﻿  ﻿  ﻿  ﻿  s3db.load_items(Pobj,Cobj,'s3db.load_statements_gui_Ri("'+Rid+'")',true);}
﻿  ﻿  ﻿  ﻿  else {s3db.load_statements_gui_Ri(Rid,S)}
﻿  ﻿  ﻿  }
﻿  ﻿  }﻿  ﻿  ﻿  
﻿  ﻿  if (div.innerHTML.length==0) {div.innerHTML="This <b>I</b>tem belongs to a <b>C</b>ollection that is <br>neither a subject nor an object of any <b>R</b>ule.<br>This is often the case for <b>C</b>ollections holding only <b>I</b>tems <br>that are relationships (verbs) or that are <br>the possible instances of a (literal Object) value";
﻿  ﻿  }
﻿  ﻿  return false;}

﻿  s3db.load_statements_gui_Ri = function (Rid,S) {﻿  ﻿  ﻿  
﻿  ﻿  var div_R = document.getElementById(Rid);
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  var whereSubject = s3db_array_extract(s3db.P[Pid].R,'subject_id',Cid.match(/\d+/g));
﻿  ﻿  div_R.innerHTML=Rid+": "+whereSubject[Rid].subject+" >("+whereSubject[Rid].verb+")><span style='color:blue'>"+whereSubject[Rid].object+"</span>&nbsp;<a style=color:green href=# onclick=s3db.add_statement(\""+Rid+"\")>add</a> </span>&nbsp;&nbsp;[<a style=color:green href=# onclick=s3db.add_files(\""+Rid+"\",\""+s3db.state.I+"\")>files</a>]";
﻿  ﻿  if (!S) {
﻿  ﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  ﻿  var S = s3db_array_extract(s3db.P[Pid].C[Cid].I[Iid].S,'rule_id',Rid.match(/\d+/g));
﻿  ﻿  ﻿  }
﻿  ﻿  for (Sid in S) {
﻿  ﻿  ﻿  var div_S = document.createElement('div');
﻿  ﻿  ﻿  div_R.appendChild(div_S);
﻿  ﻿  ﻿  div_S.id=Sid;
﻿  ﻿  ﻿  div_S.style.color='navy';
﻿  ﻿  ﻿  div_S.style.fontStyle='normal';
﻿  ﻿  ﻿  s3db.list_statement(Sid,S[Sid]);
﻿  ﻿  ﻿  //div_S.innerHTML="&nbsp;&nbsp;&nbsp;<a href=# onclick=s3db.edit_statement(\""+Sid+"\")>"+Sid+"</a>: <span id="+Sid+"_value style=font-size:"+s3db.config.fontSize_med+" >"+S[Sid].value+"</span>";
﻿  ﻿  ﻿  }
﻿  ﻿  return false}

﻿  s3db.list_statement = function (Sid,Si) {
﻿  ﻿  s3db.state.S=Sid;
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  if (!Si) {var Si = s3db.P[Pid].C[Cid].I[Iid].S[Sid];}
﻿  ﻿  var Rid = "R"+Si.rule_id;var Ri=s3db.P[Pid].R[Rid];
﻿  ﻿  var div_S = document.getElementById(Sid);
﻿  ﻿  // find out if S states a literal value or another Item
﻿  ﻿  if (!Ri.object_id) { //literal
﻿  ﻿  ﻿  div_S.innerHTML="&nbsp;&nbsp;&nbsp;<a href=# onclick=s3db.edit_statement(\""+Sid+"\")>"+Sid+"</a>: <span id="+Sid+"_value style=font-size:"+s3db.config.fontSize_med+" >"+Si.value+"</span><span id="+Sid+"_notes></span><span id="+Sid+"_msg></span>";}
﻿  ﻿  else { //Item
﻿  ﻿  ﻿  var Pobj='P'+Ri.project_id;var Cobj='C'+Ri.object_id;var Iobj='I'+Si.value;
﻿  ﻿  ﻿  div_S.innerHTML="&nbsp;&nbsp;&nbsp;<a href=# onclick=s3db.edit_statement(\""+Sid+"\")>"+Sid+"</a>: <span id="+Sid+"_value style=font-size:"+s3db.config.fontSize_med+" >"+Si.value+" [<span id="+Sid+"_value_item><span style=color:blue>...</span></span>]</span><span id="+Sid+"_notes ></span> <span id="+Sid+"_msg></span>";
﻿  ﻿  ﻿  if (!s3db.P[Pobj].C[Cobj].I) {//if Items of that class not loaded yet do it now
﻿  ﻿  ﻿  ﻿  s3db.load_items(Pobj,Cobj,'Ii_obj=s3db.P["'+Pobj+'"].C["'+Cobj+'"].I["'+Iobj+'"];document.getElementById("'+Sid+'_value_item").innerHTML=s3db.P["'+Pobj+'"].C["'+Cobj+'"].I["'+Iobj+'"].notes',true);}
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  document.getElementById(Sid+'_value_item').innerHTML=s3db.P[Pobj].C[Cobj].I[Iobj].notes}
﻿  ﻿  ﻿  }﻿  
﻿  ﻿  if (Si.notes.length>0) {document.getElementById(Sid+'_notes').innerHTML+="<span style=font-size:"+s3db.config.fontSize_small+" > ("+Si.notes+")</span></span>";}
﻿  ﻿  return false}
﻿  
﻿  s3db.add_statement = function (Rid,value) {
﻿  ﻿  if (!value) {value=' '}
﻿  ﻿  var Pid=s3db.state.P;var Iid=s3db.state.I;
﻿  ﻿  var Ri=s3db.P[Pid].R[Rid];
﻿  ﻿  if (!Ri.object_id | value!=' ') { // if target is a literal or value is an existing Item of teh target collection
﻿  ﻿  ﻿  var div_R = document.getElementById(Rid);
﻿  ﻿  ﻿  var div_S = document.createElement('div');
﻿  ﻿  ﻿  div_R.appendChild(div_S);
﻿  ﻿  ﻿  div_S.id=s3db.job();
﻿  ﻿  ﻿  div_S.style.color='blue';
﻿  ﻿  ﻿  div_S.style.fontStyle='normal';
﻿  ﻿  ﻿  div_S.innerHTML='&nbsp;&nbsp;&nbsp;creating new statement ...';
﻿  ﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><insert>statement</insert><where><rule_id>"+Rid.match(/\d+/g)+"</rule_id><item_id>"+Iid.match(/\d+/g)+"</item_id><value>"+value+"</value></where></S3QL>";
﻿  ﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.job['"+div_S.id+"']=ans;s3db.add_statement.success('"+Rid+"','"+div_S.id+"',s3db.job['"+div_S.id+"'],'"+value+"');"));
﻿  ﻿  ﻿  setTimeout("if(!s3db.job['"+div_S.id+"']){div_S.innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;creating new statement ... failed</span>'}else{setTimeout(\"delete s3db.job['"+div_S.id+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);
﻿  ﻿  ﻿  }
﻿  ﻿  else { // go get first Item of target Collection﻿  ﻿  ﻿  
﻿  ﻿  ﻿  Cobj='C'+Ri.object_id;
﻿  ﻿  ﻿  if (s3db.P[Pid].C[Cobj].I) { // if teh items of target collection already exist
﻿  ﻿  ﻿  ﻿  for (x in s3db.P[Pid].C[Cobj].I) {};// trick to get last Iid
﻿  ﻿  ﻿  ﻿  s3db.add_statement(Rid,x.slice(1,x.length))}
﻿  ﻿  ﻿  else {
﻿  ﻿  ﻿  ﻿  s3db.load_items(Pid,Cobj,"s3db.load_statements_gui_Ri('"+Rid+"');s3db.add_statement('"+Rid+"')",true)
﻿  ﻿  ﻿  ﻿  //alert(Cobj);

﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  return false}

﻿  s3db.add_statement.success = function (Rid,job,s3a,value) {
﻿  ﻿  div_S=document.getElementById(job);
﻿  ﻿  if (s3a[0].statement_id) {
﻿  ﻿  ﻿  s3a[0].value=value;
﻿  ﻿  ﻿  s3a[0].notes='';
﻿  ﻿  ﻿  s3a[0].rule_id=Rid.slice(1,Rid.length);
﻿  ﻿  ﻿  var Sid = 'S'+s3a[0].statement_id;
﻿  ﻿  ﻿  div_S.id=Sid;
﻿  ﻿  ﻿  s3db.edit_statement(Sid,s3a[0]);
﻿  ﻿  ﻿  }
﻿  ﻿  else {div_S.innerHTML='<span style=color:red>&nbsp;&nbsp;&nbsp;creating new statement ... failed</span>';}
﻿  ﻿  return false}

﻿  s3db.add_files = function (Rid,Iid) {
﻿  ﻿  var div_files = document.createElement('div');
﻿  ﻿  document.getElementById(Rid).appendChild(div_files);
﻿  ﻿  div_files.id=Rid+"_files";
﻿  ﻿  var a=document.createElement('applet');
﻿  ﻿  a.name='jumpLoaderApplet';
﻿  ﻿  a.code='jmaster.jumploader.app.JumpLoaderApplet.class';
﻿  ﻿  a.archive='jl_core_z.jar';
﻿  ﻿  a.width='300';a.height='200';
﻿  ﻿  //if (!this.files2s3db.width){a.width='600'} else {a.width=this.files2s3db.width};
﻿  ﻿  //if (!this.files2s3db.height){a.height='400'} else {a.height=this.files2s3db.height};
﻿  ﻿  var p=document.createElement('param');
﻿  ﻿  p.name='uc_uploadUrl';
﻿  ﻿  p.value=s3db.url+'/multi_upload.php?key='+s3db.key+'&rule_id='+Rid.slice(1,Rid.length)+'&item_id='+Iid.slice(1,Iid.length);
﻿  ﻿  a.appendChild(p);
﻿  ﻿  div_files.appendChild(a);
﻿  ﻿  // Close button
﻿  ﻿  var c = document.createElement('input');
﻿  ﻿  c.value="done";
﻿  ﻿  c.id=Rid+"_donefiles";
﻿  ﻿  c.type="button";
﻿  ﻿  c.Pid=s3db.state.P;c.Cid=s3db.state.C;
﻿  ﻿  c.Rid=Rid;c.Iid=Iid;
﻿  ﻿  c.onclick = function () {
﻿  ﻿  ﻿  // reload statements of this Iid
﻿  ﻿  ﻿  s3db.reload_statements_Rid(this.Pid,this.Cid,this.Rid,this.Iid,"document.getElementById('"+this.Rid+"').innerHTML='';s3db.load_statements_gui_Ri('"+this.Rid+"');")
﻿  ﻿  ﻿  //s3db.load_statements_gui_Ri('R483');
﻿  ﻿  ﻿  return false}
﻿  ﻿  div_files.appendChild(c);
﻿  ﻿  //alert(Rid+" "+Iid);
﻿  ﻿  return false}
﻿  
﻿  s3db.job = function (prefix){ // Creates unique labels
﻿  ﻿  if (!prefix) {prefix="job_"};
﻿  ﻿  return prefix+Math.random().toString().replace(/\./g,"");
﻿  ﻿  }

﻿  s3db.edit_statement = function (Sid,Snew) {
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  var S = s3db.P[Pid].C[Cid].I[Iid].S;
﻿  ﻿  if (Snew) {s3db.P[Pid].C[Cid].I[Iid].S[Sid]=Snew;}// if this is editing a statement that just was created﻿  
﻿  ﻿  var Si = s3db.P[Pid].C[Cid].I[Iid].S[Sid];
﻿  ﻿  var Ri=s3db.P[Pid].R['R'+Si.rule_id];
﻿  ﻿  var div=document.getElementById(Sid);
﻿  ﻿  if (Ri.object_id) { // object is an item
﻿  ﻿  ﻿  div.innerHTML="<nobr><a href=# style=color:red onclick='s3db.delete_statement(\""+Sid+"\")'>del</a>&nbsp;<a href=# style=color:green onclick='s3db.list_statement(\""+Sid+"\")'>"+Sid+"</a>: "+s3db.HTMLselect_I(Pid,"C"+Ri.object_id,"I"+Si.value,"id="+Sid+"_input onchange=\"s3db_events(event,'edit_statement','"+Sid+"_input')\" ")+"&nbsp;Notes:(&nbsp;<input id='"+Sid+"_notes' type='text' value='"+Si.notes+"' size='10' style='color:blue' onkeyup=\"s3db_events(event,'edit_statement','"+Sid+"_notes')\">&nbsp;)&nbsp;<span id="+Sid+"_msg></span><nobr>";
﻿  ﻿  ﻿  }
﻿  ﻿  else { // object is a literal
﻿  ﻿  ﻿  div.innerHTML="<nobr><a href=# style=color:red onclick='s3db.delete_statement(\""+Sid+"\")'>del</a>&nbsp;<a href=# style=color:green onclick='s3db.list_statement(\""+Sid+"\")'>"+Sid+"</a>: <input id='"+Sid+"_input' type='text' value='"+S[Sid].value+"' size='15' style='color:blue' onkeyup=\"s3db_events(event,'edit_statement','"+Sid+"_input')\">&nbsp;Notes:(&nbsp;<input id='"+Sid+"_notes' type='text' value='"+S[Sid].notes+"' size='10' style='color:blue' onkeyup=\"s3db_events(event,'edit_statement','"+Sid+"_notes')\">&nbsp;)&nbsp;<span id="+Sid+"_msg></span><nobr>";
﻿  ﻿  ﻿  }
﻿  ﻿  return false}

﻿  s3db.HTMLselect_I = function (Pid,Cid,Iid,ev) {// produce a SELECT/Option HTML string
﻿  ﻿  if (!ev) {var ev=''}
﻿  ﻿  var html='<select '+ev+' >';
﻿  ﻿  for (var x in s3db.P[Pid].C[Cid].I) {
﻿  ﻿  ﻿  //console.log(x+" : "+Iid);
﻿  ﻿  ﻿  if (x==Iid) {html+='<option value="'+x.match(/\d+/g)+'" SELECTED >'+x+' ('+s3db.P[Pid].C[Cid].I[x].notes+')</option>'}
﻿  ﻿  ﻿  else {html+='<option value="'+x.match(/\d+/g)+'">'+x+' ('+s3db.P[Pid].C[Cid].I[x].notes+')</option>'}}﻿  ﻿  ﻿  
﻿  ﻿  html+='</select>';
﻿  ﻿  return html}

﻿  s3db.delete_statement = function (Sid){
﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><delete>statement</delete><where><statement_id>"+Sid.match(/\d+/g)+"</statement_id></where></S3QL>";
﻿  ﻿  var job=s3db.job('del_'+Sid);
﻿  ﻿  document.getElementById(Sid+'_msg').innerHTML='<span style=color:red>del ...</span>';
﻿  ﻿  s3db_jsonpp_call(s3q,"s3db.job['"+job+"']=ans;s3db.delete_statement.success('"+job+"','"+Sid+"');");
﻿  ﻿  setTimeout("if(!s3db.job['"+job+"']){document.getElementById('"+Sid+"_msg').innerHTML='<span style=color:red>del failed</span>'}else{setTimeout(\"delete s3db.job['"+job+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);
﻿  ﻿  return false}

﻿  s3db.delete_statement.success = function (job,Sid) {
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  if (s3db.job[job][0].error_code==0) {document.getElementById(Sid).innerHTML='<span style=color:green>'+s3db.job[job][0].message+'</span>';
﻿  ﻿  delete s3db.P[Pid].C[Cid].I[Iid].S[Sid]}
﻿  ﻿  else {document.getElementById(Sid+'_msg').innerHTML='<span style=color:red>'+s3db.job[job][0].message+'</span>';}
﻿  ﻿  return false}

﻿  s3db.update_statement = function (Sid){
﻿  ﻿  document.getElementById(Sid+'_msg').innerHTML='<span style=color:red>updating ...</span>';
﻿  ﻿  var s3q = s3db.url + "/S3QL.php?key="+s3db.key+"&query=<S3QL><update>statement</update><where><statement_id>"+Sid.match(/\d+/g)+"</statement_id>";
﻿  ﻿  if (document.getElementById(Sid+'_input').style.color==='red'){
﻿  ﻿  ﻿  s3q+="<value>"+document.getElementById(Sid+'_input').value+"</value>";}
﻿  ﻿  if (document.getElementById(Sid+'_notes').style.color==='red'){
﻿  ﻿  ﻿  s3q+="<notes>"+document.getElementById(Sid+'_notes').value+"</notes>";}
﻿  ﻿  s3q+="</where></S3QL>";
﻿  ﻿  var job=s3db.job('updt_'+Sid);
﻿  ﻿  s3db_jsonpp_call(s3q,"s3db.job['"+job+"']=ans;s3db.update_statement.success('"+job+"','"+Sid+"');");
﻿  ﻿  setTimeout("if(!s3db.job['"+job+"']){document.getElementById('"+Sid+"_msg').innerHTML='<span style=color:red>updt failed</span>'}else{setTimeout(\"delete s3db.job['"+job+"']\",s3db.config.timeout_external)}",s3db.config.timeout_external);﻿  ﻿  
﻿  ﻿  return false}

﻿  s3db.update_statement.success = function (job,Sid) {
﻿  ﻿  var Pid=s3db.state.P;var Cid=s3db.state.C;var Iid=s3db.state.I;
﻿  ﻿  if (s3db.job[job][0].error_code==0) {
﻿  ﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].S[Sid].value=document.getElementById(Sid+'_input').value;
﻿  ﻿  ﻿  s3db.P[Pid].C[Cid].I[Iid].S[Sid].notes=document.getElementById(Sid+'_notes').value;
﻿  ﻿  ﻿  s3db.list_statement(Sid);
﻿  ﻿  ﻿  document.getElementById(Sid+'_msg').innerHTML='<span style=color:green>'+s3db.job[job][0].message+'</span>';
﻿  ﻿  ﻿  document.getElementById(Sid+'_value').style.color='blue';
﻿  ﻿  ﻿  document.getElementById(Sid+'_notes').style.color='blue';
﻿  ﻿  ﻿  }
﻿  ﻿  else {document.getElementById(Sid+'_msg').innerHTML='<span style=color:red>'+s3db.job[job][0].message+'</span>';}
﻿  ﻿  return false}

﻿  s3db.rule_browser = function (Pid,Cid) {
﻿  ﻿  document.getElementById('div_panel').innerHTML="";
﻿  ﻿  div_rules = document.createElement('div');
﻿  ﻿  div_rules.id = "browser_rules";
﻿  ﻿  div_rules.innerHTML=div_rules.id;
﻿  ﻿  document.getElementById('div_panel').appendChild(div_rules);
﻿  ﻿  div_query = document.createElement('div');
﻿  ﻿  div_query.id = "browser_querry";
﻿  ﻿  div_query.innerHTML=div_query.id;
﻿  ﻿  document.getElementById('div_panel').appendChild(div_query);
﻿  ﻿  s3db_rule_browser (Pid,Cid,'ini');
﻿  ﻿  return false}

﻿  s3db.find_U = function (Uid) {
﻿  ﻿  if (!s3db.U[Uid]) {
﻿  ﻿  ﻿  var s3q = s3db.url+"/URI.php?format=json&key="+s3db.key+"&uid="+Uid;
﻿  ﻿  ﻿  s3db_json_read(s3q,"find_user","s3db.U['"+Uid+"']=s3db_json.ans[0]");
﻿  ﻿  ﻿  return "(information not yet retrieved)";
﻿  ﻿  }
﻿  ﻿  return s3db.U[Uid].username;
﻿  }

﻿  // LOAD RULES
﻿  s3db.load_rules_project = function (Pid) {
﻿  ﻿  var s3q=s3db.url + "/S3QL.php?format=json&key="+s3db.key+"&query=<S3QL><select>*</select><from>rules</from><where><project_id>"+Pid.match(/\d+/g)+"</project_id></where></S3QL>";
﻿  ﻿  //s3db_jsonpp(s3q,("s3db.load_rules_project_index('"+Pid+"',ans)"));
﻿  ﻿  s3db_jsonpp_call(s3q,("s3db.load_rules_project_index('"+Pid+"',ans)"));
﻿  }
﻿  s3db.load_rules_project_index = function (Pid, ans) {
﻿  ﻿  //alert(Pid);
﻿  ﻿  R = new Array;
﻿  ﻿  for (x in ans) {
﻿  ﻿  ﻿  R["R"+ans[x].rule_id]=ans[x];
﻿  ﻿  };
﻿  ﻿  s3db.P[Pid].R=R;
﻿  ﻿  s3db.P[Pid].length_R=ans.length;
﻿  ﻿  delete(R);
﻿  ﻿  return false;
﻿  }
﻿  return false}


﻿  ﻿  /*var html ="";//alert(Pid);
﻿  ﻿  //var C = s3db.P[Pid].C;
﻿  ﻿  for (Cid in s3db.P[Pid].C) {
﻿  ﻿  ﻿  html = html + ", " + s3db.P[Pid].C[Cid].entity;
﻿  ﻿  }
﻿  ﻿  return false;*/

// --- RULE BROWSER ---
function s3db_rule_browser (Pid,Cid,opt) {
﻿  //s3db.browse.state
﻿  switch (opt)
﻿  {
﻿  case "ini":
﻿  ﻿  div_rules = document.getElementById("browser_rules");
﻿  ﻿  if (!s3db.browse[Cid]){ // list relevant rules
﻿  ﻿  s3db.browse[Cid] = new Array;
﻿  ﻿  s3db.browse[Cid]['as_subj'] = s3db_array_extract(s3db.P[Pid].R,'subject_id',Cid.match(/\d+/g));
﻿  ﻿  s3db.browse[Cid]['as_obj'] = s3db_array_extract(s3db.P[Pid].R,'object_id',Cid.match(/\d+/g));
﻿  ﻿  }
﻿  ﻿  // Display the as_subject rules in browser
﻿  ﻿  for (x in s3db.browse[Cid]['as_subj']){
﻿  ﻿  ﻿  var R = s3db.browse[Cid]['as_subj'][x];
﻿  ﻿  ﻿  div = document.createElement('div');
﻿  ﻿  ﻿  div.innerHTML ="[" + x + "] " + R.subject + " --(" + R.verb + ")--> " + R.object;
﻿  ﻿  ﻿  div.id = Cid+x ; // CidRid as id
﻿  ﻿  ﻿  div.dt = new Array; // info about this object
﻿  ﻿  ﻿  div.dt.as_subj = s3db_array_extract(s3db.P[Pid].R,'subject_id',R.object_id);
﻿  ﻿  ﻿  div.dt.as_obj = s3db_array_extract(s3db.P[Pid].R,'object_id',R.object_id);
﻿  ﻿  ﻿  div_rules.appendChild(div)}
﻿  ﻿  // Display the as_object rules in browser
﻿  ﻿  for (x in s3db.browse[Cid]['as_obj']){
﻿  ﻿  ﻿  R = s3db.browse[Cid]['as_obj'][x];
﻿  ﻿  ﻿  div = document.createElement('div');
﻿  ﻿  ﻿  div.innerHTML ="[" + x + "] " + R.object + " <--(" + R.verb + ")-- " + R.subject;
﻿  ﻿  ﻿  div.id = Cid+x ; // CidRid as id
﻿  ﻿  ﻿  div.dt = new Array; // info about this object
﻿  ﻿  ﻿  div.dt.as_subj = s3db_array_extract(s3db.P[Pid].R,'subject_id',R.subject_id);
﻿  ﻿  ﻿  div.dt.as_obj = s3db_array_extract(s3db.P[Pid].R,'object_id',R.subject_id);
﻿  ﻿  ﻿  div_rules.appendChild(div)}
﻿  break
﻿  }
﻿  return false}

// --- JSON FUNCTIONS ---

function s3db_json_read (src,src_id,next_eval) {
﻿  // Read JSON data structure formated as s3db_json()
﻿  s3db_json.done=0;
﻿  s3db_json.next_eval=next_eval;
﻿  var headID = document.getElementsByTagName("head")[0];
﻿  var script = document.createElement('script');
﻿  script.type = 'text/javascript';
﻿  script.src = src ;
﻿  script.id = src_id ;
﻿  s3db_json.src_id = src_id ; // keep it here so it can be recognized and removed after script is executed
﻿  script.defer=false;
﻿  s3db_json.query = src ; // reccord query
﻿  headID.appendChild(script); // retrieve answer, store results in s3db_json
﻿  return false;
}

function s3db_json (ans) {
﻿  //alert(ans);
﻿  s3db_json.ans = ans;
﻿  s3db_json.done = 1;
﻿  try {
﻿  ﻿  eval(s3db_json.next_eval); // evaluate next command
﻿  ﻿   // json structure loaded
﻿  }
﻿  catch (err) {
﻿  ﻿  s3db_json.done = 0; // evaluation check failed so this call is not complete
﻿  }﻿  
﻿  remove_element_by_id (s3db_json.src_id);
﻿  return false;
}

function s3db_jsonp (src,next_eval) {
﻿  // src is a string with the URL call of the source
﻿  // next_val is an expression where "ans" can be used to designate the result of the call
﻿  // for example: s3db_jsonp (src,"alert(ans[0].username)");﻿  
﻿  var pad = ("call_"+Math.random().toString().replace(/\./g,""));
﻿  if (navigator.appName!="Netscape") {
﻿  ﻿  src=src+"&format=json";
﻿  ﻿  s3db_json_read(src,pad,next_eval);
﻿  }
﻿  else {
﻿  ﻿  src=src+"&format=json&jsonp=s3db_jsonp."+pad;
﻿  ﻿  var headID = document.getElementsByTagName("head")[0];
﻿  ﻿  var script = document.createElement('script');
﻿  ﻿  script.type = 'text/javascript';
﻿  ﻿  //script.src = src ;
﻿  ﻿  script.id = "script_jsonp_"+pad;
﻿  ﻿  headID.appendChild(script); // retrieve answer
﻿  ﻿  remove_element_by_id(script.id); // remove the script that asked the question
﻿  ﻿  s3db_jsonp[pad]= function (ans) {
﻿  ﻿  //ans=ans.replace(/function\s*\(/g,""); // this would be the place to filter the content
﻿  ﻿  eval(next_eval);
﻿  ﻿  delete(this[pad]);
﻿  ﻿  return false};﻿  ﻿  
﻿  }﻿  
﻿  return false
﻿  }

function remove_element_by_id (id) {
﻿  var e = document.getElementById(id);
﻿  if (e) {e.parentNode.removeChild(e)}
﻿  return false;
}

function s3db_jsonpp_call (src,next_eval) {
﻿  var call = "call_"+Math.random().toString().replace(/\./g,"");//alert("787");
﻿  var headID = document.getElementsByTagName("head")[0];
﻿  var script = document.createElement('script');
﻿  script.id = call;
﻿  script.type = 'text/javascript';
﻿  // using padded, parameterized JSON
﻿  src=src+"&format=json&jsonp=s3db_jsonpp&jsonpp="+next_eval+"&onload=remove_element_by_id('"+script.id+"');";
﻿  script.src = src ;//window.open(src);
﻿  headID.appendChild(script); // retrieve answer
﻿  }

function s3db_jsonpp (ans,jsonpp) {
﻿  eval(jsonpp);
﻿  return ans}