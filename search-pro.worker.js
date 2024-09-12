const V=Object.entries,et=Object.fromEntries,st="ENTRIES",L="KEYS",T="VALUES",_="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===_)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==_).join("")}value(){return E(this._path).node.get(_)}result(){switch(this._type){case T:return this.value();case L:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],nt=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const c of e.keys())if(c===_){const a=o[d-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let h=0;h<c.length;++h,++a){const g=c[h],m=i*a,p=m-i;let l=o[m];const f=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let F=f;F<y;++F){const v=g!==t[F],z=o[p+F]+ +v,A=o[p+F+1]+1,w=o[m+F]+1,j=o[m+F+1]=Math.min(z,A,w);j<l&&(l=j)}if(l>s)continue t}R(e.get(c),t,s,n,o,a,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==_&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ot(this._tree,t)}entries(){return new D(this,st)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return nt(this._tree,t,s)}get(t){const s=k(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){const s=k(this._tree,t);return s!==void 0&&s.has(_)}keys(){return new D(this,L)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,I(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},k=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return k(e.get(s),t.slice(s.length))},I=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==_&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const c=new Map;c.set(u.slice(r),d),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ot=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(_),s.size===0)W(n);else if(s.size===1){const[o,u]=s.entries().next().value;q(n,o,u)}}},W=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)W(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&q(e.slice(0,-1),n,o)}},q=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],ut=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},it=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,M="or",$="and",rt="and_not",ct=(e,t)=>{e.includes(t)||e.push(t)},N=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},P=({score:e},{score:t})=>t-e,lt=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,ht={[M]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),N(n.terms,u)}}return e},[$]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);N(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[rt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},at=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,lt),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},gt={k:1.2,b:.7,d:.5},mt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(it),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:M,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:gt},pt={combineWith:$,prefix:(e,t,s)=>t===s.length-1},Ft={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},_t={...Ft,...U},K=Symbol("*"),yt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,u]of e._documentIds){const i=n.boostDocument?n.boostDocument(u,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},X=(e,t=M)=>{if(e.length===0)return new Map;const s=t.toLowerCase(),n=ht[s];if(!n)throw new Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map},S=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const c of Object.keys(u)){const a=u[c],h=e._fieldIds[c],g=o.get(h);if(g==null)continue;let m=g.size;const p=e._avgFieldLength[h];for(const l of g.keys()){if(!e._documentIds.has(l)){ft(e,h,l,s),m-=1;continue}const f=i?i(e._documentIds.get(l),s,e._storedFields.get(l)):1;if(!f)continue;const y=g.get(l),F=e._fieldLength.get(l)[h],v=dt(y,m,e._documentCount,F,p,r),z=n*a*f*v,A=d.get(l);if(A){A.score+=z,ct(A.terms,t);const w=G(A.match,s);w?w.push(c):A.match[s]=[c]}else d.set(l,{score:z,terms:[t],match:{[s]:[c]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((l,f)=>({...l,[f]:G(n.boost,f)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:c,prefix:a}={...J.weights,...i},h=e._index.get(t.term),g=S(e,t.term,t.term,1,h,o,u,d);let m,p;if(t.prefix&&(m=e._index.atPrefix(t.term)),t.fuzzy){const l=t.fuzzy===!0?.2:t.fuzzy,f=l<1?Math.min(r,Math.round(t.term.length*l)):l;f&&(p=e._index.fuzzyGet(t.term,f))}if(m)for(const[l,f]of m){const y=l.length-t.term.length;if(!y)continue;p?.delete(l);const F=a*l.length/(l.length+.3*y);S(e,t.term,l,F,f,o,u,d,g)}if(p)for(const l of p.keys()){const[f,y]=p.get(l);if(!y)continue;const F=c*l.length/(l.length+y);S(e,t.term,l,F,f,o,u,d,g)}return g},Y=(e,t,s={})=>{if(t===K)return yt(e,s);if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(g=>Y(e,g,a));return X(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,c=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(at(i)).map(a=>At(e,a,i));return X(c,i.combineWith)},Q=(e,t,s={})=>{const n=Y(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const c=r.length||1,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(d),queryTerms:r,match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return t===K&&s.boostDocument==null&&e._options.searchOptions.boostDocument==null||o.sort(P),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Q(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(P),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?_t:t.autoVacuum;this._options={...mt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...pt,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=b(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=b(u),h._avgFieldLength=i,h._storedFields=b(r),h._dirtCount=d||0,h._index=new C;for(const[g,m]of h._documentIds)h._idToShortId.set(m,g);for(const[g,m]of e){const p=new Map;for(const l of Object.keys(m)){let f=m[l];c===1&&(f=f.ds),p.set(parseInt(l,10),b(f))}h._index.set(g,p)}return h},B=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let h="";i===0?h=c.length>20?`… ${c.slice(-20)}`:c:a?h=c.length+i>100?`${c.slice(0,100-i)}… `:c:h=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const c=d+n.length;if(r(e.slice(u,d)),u=c,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},wt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),xt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),Z=(e,t,s={})=>{const n={};return Q(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),c=u.includes("#"),[a,h]=u.split(/[#@]/),g=Number(a),m=i.sort((l,f)=>l.length-f.length).filter((l,f)=>i.slice(f+1).every(y=>!y.includes(l))),{contents:p}=n[g]??={title:"",contents:[]};if(d)p.push([{type:"customField",id:g,index:h,display:m.map(l=>o.c.map(f=>B(f,l))).flat().filter(l=>l!==null)},r]);else{const l=m.map(f=>B(o.h,f)).filter(f=>f!==null);if(l.length&&p.push([{type:c?"heading":"title",id:g,...c&&{anchor:h},display:l},r]),"t"in o)for(const f of o.t){const y=m.map(F=>B(f,F)).filter(F=>F!==null);y.length&&p.push([{type:"text",id:g,...c&&{anchor:h},display:y},r])}}}),V(n).sort(([,o],[,u])=>"max"==="total"?wt(o,u):xt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=ut(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},tt=(e,t,s={})=>{const n=Ct(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},bt=et(V(JSON.parse("{\"/\":{\"documentCount\":7,\"nextId\":7,\"documentIds\":{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"4\",\"4\":\"4#一-创建项目\",\"5\":\"4@0\",\"6\":\"5\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,31],\"1\":[1],\"2\":[1],\"3\":[2,15],\"4\":[2,125],\"5\":[null,null,1],\"6\":[1,3]},\"averageFieldLength\":[1.3428571428571427,40.371428571428574,0.16666666666666666],\"storedFields\":{\"0\":{\"h\":\"个人介绍\",\"t\":[\"Hi，欢迎访问我的个人博客。\",\"我是一个名曰全栈工程师的，却全不精通的码农。\",\"目前已近中年，总想着再努力一点，再进步一点，让自己变得有趣，变得自信！\",\"曾经有过很多博客，写过很多博文，从51开始，到校内、新浪、百度空间、qq空间、csdn、自建博客等等。各种原因吧，要么没了，要么弃了。但年龄大了，脑子不好使了，学东西的时候总想着做做笔记，以便后续再拿出来看看，用用！所以就又有了这个博客。\",\"我会在这里记录我的学习过程，分享一些自己的想法和经验，也会分享一些我认为有趣的技术文章。\"]},\"1\":{\"h\":\"博文\"},\"2\":{\"h\":\"其他\"},\"3\":{\"h\":\"使用VuePress+GitHub Pages搭建自己的静态博客站\",\"t\":[\"本文介绍通过 VuePress + GitHub Pages 搭建自己的静态站博客，这里使用的是Vuepress的hope主题。\",\"提示\",\"开始前你得装好nodejs、git、npm（或者pnpm、yarn），并且注册好github账号。\"]},\"4\":{\"h\":\"一. 创建项目\",\"t\":[\"在github上创建一个仓库，名称随意，这里我创建了一个叫blog2的仓库(注意：为了方便，我们只创建空仓库——不要创建README文件)。\",\"在本地创建一个文件夹（最好英文名），并进入该文件夹，执行如下命令：\",\"npm init vuepress-theme-hope@latest blog2\",\"提示\",\"我这里测试用，所以用的是blog2，实际使用中请修改成自己的想要的文件夹名字。\",\"运行命令后选择中文（如果你英文不错可以选择English）\",\"包管理器选你想用的，我这里选择npm\",\"打包器选你想用的，我选的是Vite\",\"应用名称随意，这里我写的是blog2\",\"应用描述随意，这里我写的是我的博客\",\"版本号随意，这里我写的是1.0.0\",\"协议随意，这里我直接回车用默认\",\"想要创建的项目类型选blog\",\"项目多语言与否看你自己的情况，我这里输入n\",\"是否初始化Git仓库，我这里输入y\",\"是否需要一个自动部署文档到GitHubPages的工作流，输入y\",\"镜像选国内镜像\",\"是否现在启动demo查看，输入y\",\"命令执行完后，会在本地生成一个名为blog2的文件夹，里面已经包含了一个VuePress项目，我们只需要在里面修改一下配置，就可以搭建自己的静态站博客了。 3. 进入blog2文件夹，使用git执行如下命令：\",\"git remote add origin https://github.com/your_username/blog2.git\",\"提示\",\"请把your_username替换成你的github用户名。把blog2替换成你的仓库名。\",\"这条命令的作用是将本地仓库与远程仓库关联，这样就可以将本地仓库的修改推送到远程仓库。\",\"执行如下git命令：\",\"git add . git commit -m \\\"first commit\\\" git branch -M main git push -u origin main\",\"提示\",\"上面的命令是将本地仓库的修改推送到远程仓库，需要输入你的github账号的密码，如果你的github账号设置了两步验证，需要输入验证码。\",\"打开浏览器，输入你的github仓库的网址，可以看到你的项目里的代码已经有了。\",\"稍等一会，或者进入仓库的Actions页面看看，有个正在执行的工作流，等它执行完后，就可以看到你的项目多了一个分支gh-pages，这就是你的静态站博客的源码了。\",\"回到你的github仓库的主页，点击Settings，找到Pages，下面我们将要设置开通pages地址。如下图： \",\"提示\",\"注意： 选择gh-pages分支，然后点击Save按钮。 稍等几分钟，刷新页面就可以看到你的静态站博客的网址了。如图： \",\"打开那个地址，你会看到你得博客了。但是看起来有些乱，这是因为我们的博客处在一个二级目录blog2下，所以我们需要配置下.vuepress/config.js文件，将base配置成\\\"/blog2/\\\"。\",\"export default defineUserConfig({ base: \\\"/blog2/\\\", // 其他配置项 }\",\"保存后，将代码同步到仓库（当然你也可以在线上直接改，直接提交代码，这里就不演示了）。等待一会，让GitHub自动部署完，刷新页面，你会看到你的博客首页已经正常显示了。\"]},\"5\":{\"c\":[\"其他\"]},\"6\":{\"h\":\"\",\"t\":[\"404 Not Found\"]}},\"dirtCount\":0,\"index\":[[\"found\",{\"1\":{\"6\":1}}],[\"first\",{\"1\":{\"4\":1}}],[\"not\",{\"1\":{\"6\":1}}],[\"npm\",{\"1\":{\"3\":1,\"4\":1}}],[\"404\",{\"1\":{\"6\":1}}],[\"你会看到你的博客首页已经正常显示了\",{\"1\":{\"4\":1}}],[\"你会看到你得博客了\",{\"1\":{\"4\":1}}],[\"刷新页面\",{\"1\":{\"4\":1}}],[\"刷新页面就可以看到你的静态站博客的网址了\",{\"1\":{\"4\":1}}],[\"让github自动部署完\",{\"1\":{\"4\":1}}],[\"让自己变得有趣\",{\"1\":{\"0\":1}}],[\"等待一会\",{\"1\":{\"4\":1}}],[\"等它执行完后\",{\"1\":{\"4\":1}}],[\"直接提交代码\",{\"1\":{\"4\":1}}],[\"当然你也可以在线上直接改\",{\"1\":{\"4\":1}}],[\"将代码同步到仓库\",{\"1\":{\"4\":1}}],[\"将base配置成\",{\"1\":{\"4\":1}}],[\"保存后\",{\"1\":{\"4\":1}}],[\"defineuserconfig\",{\"1\":{\"4\":1}}],[\"default\",{\"1\":{\"4\":1}}],[\"export\",{\"1\":{\"4\":1}}],[\"js文件\",{\"1\":{\"4\":1}}],[\"但是看起来有些乱\",{\"1\":{\"4\":1}}],[\"但年龄大了\",{\"1\":{\"0\":1}}],[\"稍等几分钟\",{\"1\":{\"4\":1}}],[\"稍等一会\",{\"1\":{\"4\":1}}],[\"然后点击save按钮\",{\"1\":{\"4\":1}}],[\"选择gh\",{\"1\":{\"4\":1}}],[\"如图\",{\"1\":{\"4\":1}}],[\"如下图\",{\"1\":{\"4\":1}}],[\"如果你的github账号设置了两步验证\",{\"1\":{\"4\":1}}],[\"如果你英文不错可以选择english\",{\"1\":{\"4\":1}}],[\"下面我们将要设置开通pages地址\",{\"1\":{\"4\":1}}],[\"找到pages\",{\"1\":{\"4\":1}}],[\"点击settings\",{\"1\":{\"4\":1}}],[\"回到你的github仓库的主页\",{\"1\":{\"4\":1}}],[\"就可以看到你的项目多了一个分支gh\",{\"1\":{\"4\":1}}],[\"就可以搭建自己的静态站博客了\",{\"1\":{\"4\":1}}],[\"有个正在执行的工作流\",{\"1\":{\"4\":1}}],[\"或者进入仓库的actions页面看看\",{\"1\":{\"4\":1}}],[\"或者pnpm\",{\"1\":{\"3\":1}}],[\"可以看到你的项目里的代码已经有了\",{\"1\":{\"4\":1}}],[\"输入你的github仓库的网址\",{\"1\":{\"4\":1}}],[\"输入y\",{\"1\":{\"4\":2}}],[\"打开那个地址\",{\"1\":{\"4\":1}}],[\"打开浏览器\",{\"1\":{\"4\":1}}],[\"打包器选你想用的\",{\"1\":{\"4\":1}}],[\"需要输入验证码\",{\"1\":{\"4\":1}}],[\"需要输入你的github账号的密码\",{\"1\":{\"4\":1}}],[\"上面的命令是将本地仓库的修改推送到远程仓库\",{\"1\":{\"4\":1}}],[\"u\",{\"1\":{\"4\":1}}],[\"username替换成你的github用户名\",{\"1\":{\"4\":1}}],[\"username\",{\"1\":{\"4\":1}}],[\"push\",{\"1\":{\"4\":1}}],[\"pages分支\",{\"1\":{\"4\":1}}],[\"pages\",{\"1\":{\"3\":1,\"4\":1}}],[\"pages搭建自己的静态博客站\",{\"0\":{\"3\":1}}],[\"base\",{\"1\":{\"4\":1}}],[\"branch\",{\"1\":{\"4\":1}}],[\"blog2\",{\"1\":{\"4\":4}}],[\"main\",{\"1\":{\"4\":2}}],[\"m\",{\"1\":{\"4\":2}}],[\"执行如下git命令\",{\"1\":{\"4\":1}}],[\"执行如下命令\",{\"1\":{\"4\":1}}],[\"这是因为我们的博客处在一个二级目录blog2下\",{\"1\":{\"4\":1}}],[\"这就是你的静态站博客的源码了\",{\"1\":{\"4\":1}}],[\"这样就可以将本地仓库的修改推送到远程仓库\",{\"1\":{\"4\":1}}],[\"这条命令的作用是将本地仓库与远程仓库关联\",{\"1\":{\"4\":1}}],[\"这里就不演示了\",{\"1\":{\"4\":1}}],[\"这里我直接回车用默认\",{\"1\":{\"4\":1}}],[\"这里我写的是1\",{\"1\":{\"4\":1}}],[\"这里我写的是我的博客\",{\"1\":{\"4\":1}}],[\"这里我写的是blog2\",{\"1\":{\"4\":1}}],[\"这里我创建了一个叫blog2的仓库\",{\"1\":{\"4\":1}}],[\"这里使用的是vuepress的hope主题\",{\"1\":{\"3\":1}}],[\"把blog2替换成你的仓库名\",{\"1\":{\"4\":1}}],[\"请把your\",{\"1\":{\"4\":1}}],[\"your\",{\"1\":{\"4\":1}}],[\"yarn\",{\"1\":{\"3\":1}}],[\"config\",{\"1\":{\"4\":1}}],[\"commit\",{\"1\":{\"4\":2}}],[\"com\",{\"1\":{\"4\":1}}],[\"csdn\",{\"1\":{\"0\":1}}],[\"origin\",{\"1\":{\"4\":2}}],[\"add\",{\"1\":{\"4\":2}}],[\"remote\",{\"1\":{\"4\":1}}],[\"使用git执行如下命令\",{\"1\":{\"4\":1}}],[\"使用vuepress+github\",{\"0\":{\"3\":1}}],[\"进入blog2文件夹\",{\"1\":{\"4\":1}}],[\"3\",{\"1\":{\"4\":1}}],[\"里面已经包含了一个vuepress项目\",{\"1\":{\"4\":1}}],[\"会在本地生成一个名为blog2的文件夹\",{\"1\":{\"4\":1}}],[\"命令执行完后\",{\"1\":{\"4\":1}}],[\"镜像选国内镜像\",{\"1\":{\"4\":1}}],[\"是否现在启动demo查看\",{\"1\":{\"4\":1}}],[\"是否需要一个自动部署文档到githubpages的工作流\",{\"1\":{\"4\":1}}],[\"是否初始化git仓库\",{\"1\":{\"4\":1}}],[\"项目多语言与否看你自己的情况\",{\"1\":{\"4\":1}}],[\"想要创建的项目类型选blog\",{\"1\":{\"4\":1}}],[\"协议随意\",{\"1\":{\"4\":1}}],[\"0\",{\"1\":{\"4\":2}}],[\"版本号随意\",{\"1\":{\"4\":1}}],[\"应用描述随意\",{\"1\":{\"4\":1}}],[\"应用名称随意\",{\"1\":{\"4\":1}}],[\"包管理器选你想用的\",{\"1\":{\"4\":1}}],[\"运行命令后选择中文\",{\"1\":{\"4\":1}}],[\"实际使用中请修改成自己的想要的文件夹名字\",{\"1\":{\"4\":1}}],[\"所以我们需要配置下\",{\"1\":{\"4\":1}}],[\"所以用的是blog2\",{\"1\":{\"4\":1}}],[\"所以就又有了这个博客\",{\"1\":{\"0\":1}}],[\"latest\",{\"1\":{\"4\":1}}],[\"https\",{\"1\":{\"4\":1}}],[\"hope\",{\"1\":{\"4\":1}}],[\"hi\",{\"1\":{\"0\":1}}],[\"theme\",{\"1\":{\"4\":1}}],[\"init\",{\"1\":{\"4\":1}}],[\"并进入该文件夹\",{\"1\":{\"4\":1}}],[\"并且注册好github账号\",{\"1\":{\"3\":1}}],[\"最好英文名\",{\"1\":{\"4\":1}}],[\"在本地创建一个文件夹\",{\"1\":{\"4\":1}}],[\"在github上创建一个仓库\",{\"1\":{\"4\":1}}],[\"不要创建readme文件\",{\"1\":{\"4\":1}}],[\"为了方便\",{\"1\":{\"4\":1}}],[\"注意\",{\"1\":{\"4\":2}}],[\"名称随意\",{\"1\":{\"4\":1}}],[\"创建项目\",{\"0\":{\"4\":1}}],[\"一\",{\"0\":{\"4\":1}}],[\"git\",{\"1\":{\"3\":1,\"4\":6}}],[\"github\",{\"1\":{\"3\":1,\"4\":1}}],[\"开始前你得装好nodejs\",{\"1\":{\"3\":1}}],[\"提示\",{\"1\":{\"3\":1,\"4\":4}}],[\"搭建自己的静态站博客\",{\"1\":{\"3\":1}}],[\"+\",{\"1\":{\"3\":1}}],[\"vuepress\",{\"1\":{\"3\":1,\"4\":2}}],[\"本文介绍通过\",{\"1\":{\"3\":1}}],[\"其他配置项\",{\"1\":{\"4\":1}}],[\"其他\",{\"0\":{\"2\":1},\"2\":{\"5\":1}}],[\"博文\",{\"0\":{\"1\":1}}],[\"也会分享一些我认为有趣的技术文章\",{\"1\":{\"0\":1}}],[\"分享一些自己的想法和经验\",{\"1\":{\"0\":1}}],[\"我们只需要在里面修改一下配置\",{\"1\":{\"4\":1}}],[\"我们只创建空仓库\",{\"1\":{\"4\":1}}],[\"我选的是vite\",{\"1\":{\"4\":1}}],[\"我这里输入y\",{\"1\":{\"4\":1}}],[\"我这里输入n\",{\"1\":{\"4\":1}}],[\"我这里选择npm\",{\"1\":{\"4\":1}}],[\"我这里测试用\",{\"1\":{\"4\":1}}],[\"我会在这里记录我的学习过程\",{\"1\":{\"0\":1}}],[\"我是一个名曰全栈工程师的\",{\"1\":{\"0\":1}}],[\"用用\",{\"1\":{\"0\":1}}],[\"以便后续再拿出来看看\",{\"1\":{\"0\":1}}],[\"学东西的时候总想着做做笔记\",{\"1\":{\"0\":1}}],[\"脑子不好使了\",{\"1\":{\"0\":1}}],[\"要么弃了\",{\"1\":{\"0\":1}}],[\"要么没了\",{\"1\":{\"0\":1}}],[\"各种原因吧\",{\"1\":{\"0\":1}}],[\"自建博客等等\",{\"1\":{\"0\":1}}],[\"qq空间\",{\"1\":{\"0\":1}}],[\"百度空间\",{\"1\":{\"0\":1}}],[\"新浪\",{\"1\":{\"0\":1}}],[\"到校内\",{\"1\":{\"0\":1}}],[\"从51开始\",{\"1\":{\"0\":1}}],[\"写过很多博文\",{\"1\":{\"0\":1}}],[\"曾经有过很多博客\",{\"1\":{\"0\":1}}],[\"变得自信\",{\"1\":{\"0\":1}}],[\"再进步一点\",{\"1\":{\"0\":1}}],[\"总想着再努力一点\",{\"1\":{\"0\":1}}],[\"目前已近中年\",{\"1\":{\"0\":1}}],[\"却全不精通的码农\",{\"1\":{\"0\":1}}],[\"欢迎访问我的个人博客\",{\"1\":{\"0\":1}}],[\"个人介绍\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const u=bt[s];e==="suggest"?self.postMessage([e,o,tt(t,u,n)]):e==="search"?self.postMessage([e,o,Z(t,u,n)]):self.postMessage({suggestions:[e,o,tt(t,u,n)],results:[e,o,Z(t,u,n)]})};
//# sourceMappingURL=index.js.map
