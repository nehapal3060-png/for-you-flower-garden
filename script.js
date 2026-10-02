const scene=document.getElementById('scene');
const flowers=document.getElementById('flowers');
const fireflies=document.getElementById('fireflies');
const music=document.getElementById('music');
const petalDrift=document.getElementById('petalDrift');
const bgMusic=document.getElementById('bgMusic');
const letterScreen=document.getElementById('letterScreen');
const envelopeWrap=document.getElementById('envelopeWrap');
const forYou=document.getElementById('forYou');
const rand=(a,b)=>Math.random()*(b-a)+a;
bgMusic.volume=.34;

const palettes={
 rose:[['#d8899f','#f2c0cc','#f4d2a1'],['#b95f78','#e9a0b2','#f5c98c'],['#dca5bd','#f1c5d7','#e8c58f']],
 daisy:[['#f6ead2','#fff5df','#e2b85c'],['#e8f0df','#fffdf2','#d4a95b'],['#f5d4dd','#fff5f4','#e0a85e']],
 tulip:[['#d87892','#ed9fb2','#f4c98b'],['#e9a2b6','#f5c3cf','#efd18e'],['#c982ad','#e6a6ca','#f1d08d']],
 sunflower:[['#e3ad4b','#f2c968','#6d4921'],['#d99837','#f1bb4d','#65401c']],
 lavender:[['#8c78b9','#b8a6df','#d8c4ed'],['#a084c5','#c4b2e5','#ead8f0'],['#6f65a5','#a99cd4','#ddd2ee']]
};
const types=['rose','daisy','tulip','sunflower','lavender'];

function stars(){for(let i=0;i<105;i++){const x=document.createElement('i');x.className='star';x.style.left=rand(2,98)+'%';x.style.top=rand(3,72)+'%';x.style.setProperty('--d',rand(2.2,6)+'s');x.style.animationDelay=rand(0,5)+'s';document.getElementById('stars').append(x)}}
function dust(){for(let i=0;i<38;i++){const x=document.createElement('i');x.className='speck';x.style.left=rand(3,97)+'%';x.style.top=rand(30,90)+'%';x.style.setProperty('--x',rand(-35,35)+'px');x.style.setProperty('--d',rand(4,9)+'s');x.style.animationDelay=rand(0,7)+'s';document.getElementById('dust').append(x)}}
function grass(id,n){const root=document.getElementById(id);for(let i=0;i<n;i++){const b=document.createElement('i');b.className='blade';b.style.left=rand(-1,101)+'%';b.style.setProperty('--h',rand(20,110)+'px');b.style.setProperty('--r',rand(-16,16)+'deg');b.style.setProperty('--d',rand(2,4.5)+'s');b.style.animationDelay=rand(-4,0)+'s';root.append(b)}}
function makeFlower(delay=0,x=rand(2,98),front=false,index=0){
 const type=types[index%types.length];
 const f=document.createElement('div'); f.className='flower '+type;
 const h=front?rand(80,205):rand(105,285); const size=rand(18,34);
 const colors=palettes[type][Math.floor(Math.random()*palettes[type].length)];
 f.style.left=x+'%'; f.style.setProperty('--h',h+'px'); f.style.setProperty('--size',size+'px'); f.style.setProperty('--base',rand(7,17)+'%');
 f.style.setProperty('--lean',rand(-8,8)+'deg'); f.style.setProperty('--delay',delay+'s'); f.style.setProperty('--petal',colors[0]); f.style.setProperty('--petal2',colors[1]); f.style.setProperty('--center',colors[2]);
 f.style.setProperty('--leaf',type==='lavender'?'#4f8b5c':'#397847'); f.style.setProperty('--leaf2',type==='lavender'?'#6aa36e':'#2d693c');
 f.style.setProperty('--leafpos',rand(30,70)+'%'); f.style.setProperty('--leafw',rand(9,18)+'px'); f.style.setProperty('--leafw2',rand(8,15)+'px'); f.style.setProperty('--glow',colors[0]);
 f.innerHTML='<span class="stem"></span><span class="head"><i class="petal p1"></i><i class="petal p2"></i><i class="petal p3"></i><i class="petal p4"></i><i class="petal p5"></i><i class="petal p6"></i><i class="petal p7"></i><i class="petal p8"></i><i class="center"></i></span>';
 // Secondary petal tone gives the garden more variation.
 f.querySelectorAll('.petal').forEach((p,i)=>{if(i%3===1)p.style.background=colors[1]});
 flowers.append(f);
}
function initial(){
 flowers.innerHTML='';
 const mobile=window.innerWidth<600; const n=mobile?150:210;
 const order=[0,1,2,3,4,1,0,2,4,3];
 for(let i=0;i<n;i++){
   const front=i%4!==0;
   const x=rand(1,99);
   makeFlower(i*.045+rand(0,.7),x,front,order[i%order.length]);
 }
}
function driftingPetals(){for(let i=0;i<22;i++){const p=document.createElement('i');p.className='petal-piece';p.style.left=rand(-5,105)+'%';p.style.setProperty('--x',rand(-100,100)+'px');p.style.setProperty('--x2',rand(-150,150)+'px');p.style.setProperty('--d',rand(10,20)+'s');p.style.setProperty('--delay',rand(-20,0)+'s');petalDrift.append(p)}}
function firefliesMake(){for(let i=0;i<34;i++){const f=document.createElement('i');f.className='firefly';f.style.left=rand(4,96)+'%';f.style.top=rand(25,82)+'%';f.style.setProperty('--x',rand(-28,28)+'px');f.style.setProperty('--y',rand(-36,36)+'px');f.style.setProperty('--d',rand(3.5,7)+'s');f.style.animationDelay=rand(0,7)+'s';fireflies.append(f)}}
async function playMusic(restart=false){try{if(restart)bgMusic.currentTime=0;bgMusic.volume=0;await bgMusic.play();music.textContent='♫';music.setAttribute('aria-label','Pause music');music.setAttribute('aria-pressed','true');const start=performance.now();const fade=()=>{const t=Math.min((performance.now()-start)/1800,1);bgMusic.volume=.34*t;if(t<1)requestAnimationFrame(fade)};requestAnimationFrame(fade)}catch(e){music.textContent='♪';music.setAttribute('aria-label','Play music');music.setAttribute('aria-pressed','false')}}
async function replayMusic(){await playMusic(true)}
music.onclick=async e=>{e.stopPropagation();if(bgMusic.paused)await playMusic(false);else{bgMusic.pause();music.textContent='♪';music.setAttribute('aria-label','Play music');music.setAttribute('aria-pressed','false')}};

async function openEnvelope(){
  if(letterScreen.classList.contains('opening')) return;
  letterScreen.classList.add('opening');
  await playMusic(false);
  setTimeout(()=>letterScreen.classList.add('show-message'),700);
  setTimeout(()=>letterScreen.classList.add('leave'),1900);
  setTimeout(()=>{letterScreen.style.display='none';},2900);
}
envelopeWrap.addEventListener('click',openEnvelope);
envelopeWrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openEnvelope()}});

stars();dust();driftingPetals();grass('grassBack',90);grass('grassFront',115);initial();firefliesMake();
