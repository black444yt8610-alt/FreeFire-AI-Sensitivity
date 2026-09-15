const SUPABASE_URL="https://cvwkvwvdtvmhlqpdyojn.supabase.co";
const SUPABASE_KEY="sb_publishable_RjCn6_NMMYHYaBTjLQRhZw_Hys9lhsu";
const API=`${SUPABASE_URL}/functions/v1/freefire-sensitivity-v7`;
const supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const $=id=>document.getElementById(id);
let authMode="user", authAction="login", aim="";
const emailFor=u=>`${u.trim().toLowerCase()}@accounts.nexaro.local`;
function status(el,msg,error=false){el.textContent=msg;el.className=`status ${error?'error':''}`}
function setAuthMode(mode){authMode=mode;$('userMode').classList.toggle('active',mode==='user');$('adminMode').classList.toggle('active',mode==='admin');$('authPass').value='';status($('authStatus'),'');if(mode==='admin'){$('loginTab').classList.add('active');$('createTab').classList.remove('active');authAction='login';$('authGo').textContent='ADMIN LOGIN';$('createTab').style.display='none'}else{$('createTab').style.display='';$('authGo').textContent=authAction==='login'?'LOG IN TO NEXARO':'CREATE NEXARO ACCOUNT'}}
$('userMode').onclick=()=>setAuthMode('user');$('adminMode').onclick=()=>setAuthMode('admin');
$('loginTab').onclick=()=>{authAction='login';$('loginTab').classList.add('active');$('createTab').classList.remove('active');$('authGo').textContent='LOG IN TO NEXARO';status($('authStatus'),'')};
$('createTab').onclick=()=>{authAction='signup';$('createTab').classList.add('active');$('loginTab').classList.remove('active');$('authGo').textContent='CREATE NEXARO ACCOUNT';status($('authStatus'),'')};
async function auth(){const u=$('authUser').value.trim().toLowerCase(),p=$('authPass').value;if(!u)return status($('authStatus'),'Enter your Nexaro username.',true);if(p.length<8)return status($('authStatus'),'Password must be at least 8 characters.',true);status($('authStatus'),authAction==='signup'?'Creating your Nexaro account…':'Signing in…');try{if(authAction==='signup'){
 const {data,error}=await supabase.auth.signUp({email:emailFor(u),password:p,options:{data:{nexaro_username:u}}});
 if(error){if(/already|registered|exists/i.test(error.message))return status($('authStatus'),'User already exist. This Nexaro username is already registered. Use Log in.',true);return status($('authStatus'),error.message,true)}
 if(!data.session){return status($('authStatus'),'Account created. Supabase Email Confirmation is enabled. For username-only Nexaro accounts, disable Confirm Email in Supabase Authentication settings, then log in.',true)}
 return enter(u,'user',data.session);
 }
 const {data,error}=await supabase.auth.signInWithPassword({email:emailFor(u),password:p});
 if(error)return status($('authStatus'),/invalid|credentials/i.test(error.message)?'Username or password is incorrect.':error.message,true);
 const {data:profile,error:pe}=await supabase.rpc('get_nexaro_profile');
 const role=profile?.role||'user';const profileUser=profile?.username||u;if(pe){await supabase.auth.signOut();return status($('authStatus'),'Account profile could not be loaded. Please try again.',true)}if(authMode==='admin'&&role!=='admin'){await supabase.auth.signOut();return status($('authStatus'),'This account does not have admin access.',true)}
 if(authMode==='user'&&role==='admin'){await supabase.auth.signOut();return status($('authStatus'),'This is an admin account. Choose Admin Login.',true)}
 return enter(profileUser,role,data.session);
 }catch(e){status($('authStatus'),'Connection error. Check your internet connection and Supabase URL, then try again.',true)}}
$('authGo').onclick=auth;
$('authPass').addEventListener('keydown',e=>{if(e.key==='Enter')auth()});
function enter(username,role,session){localStorage.setItem('nexaro_session',JSON.stringify(session));localStorage.setItem('nexaro_identity',JSON.stringify({username,role}));$('auth').classList.add('hidden');$('app').classList.remove('hidden');$('who').textContent=`${username} • ${role}`}
$('logout').onclick=async()=>{await supabase.auth.signOut();localStorage.removeItem('nexaro_session');localStorage.removeItem('nexaro_identity');$('app').classList.add('hidden');$('auth').classList.remove('hidden');status($('authStatus'),'Logged out.')};
try{const x=JSON.parse(localStorage.getItem('nexaro_identity')||'null');if(x)enter(x.username,x.role,JSON.parse(localStorage.getItem('nexaro_session')||'null'))}catch{}
document.querySelectorAll('#opts button[data-v]').forEach(b=>b.onclick=()=>{document.querySelectorAll('#opts button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');aim=b.dataset.v;$('custom').classList.add('hide')});
$('customBtn').onclick=()=>{document.querySelectorAll('#opts button').forEach(x=>x.classList.remove('selected'));$('custom').classList.remove('hide');$('custom').focus();aim=''};
$('go').onclick=async()=>{const custom=$('custom').value.trim();const feedback=custom||aim;if(!feedback)return status($('status'),'Select or type your drag feedback.',true);if(!$('current').value.trim())return status($('status'),'Enter your current sensitivity.',true);status($('status'),'Nexaro is analyzing…');$('result').textContent='';const p={device_name:$('device').value.trim(),ram_gb:+$('ram').value||null,refresh_rate_hz:+$('refresh').value||null,touch_sampling_hz:+$('touch').value||null,dpi:+$('dpi').value||null,width_px:+$('width').value||null,height_px:+$('height').value||null,fps:$('fps').value,player_style:$('style').value,graphics:$('graphics').value,game:'Free Fire',game_version:'current',current_sensitivity:$('current').value,aim_feedback:feedback,custom_feedback:custom,language:'English'};if(!p.device_name)return status($('status'),'Enter your device model.',true);try{const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY},body:JSON.stringify(p)});const text=await r.text();let d={};try{d=JSON.parse(text)}catch{}if(!r.ok)return status($('status'),d.message||d.error||`Server error (${r.status})`,true);status($('status'),`Analyzed by ${d.provider||'Nexaro'} • Saved: ${d.saved?'Yes':'No'}`);$('result').textContent=d.reply||JSON.stringify(d,null,2)}catch(e){status($('status'),'Could not reach Nexaro AI. The server may be temporarily unavailable. Try again.',true)}};
