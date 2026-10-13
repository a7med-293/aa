// Change this value to set your own entry password.
const SITE_PASSWORD = 'a124a293#';
const grid = document.querySelector('#galleryGrid');
const galleryItems = [...grid.querySelectorAll('.gallery-item')];
galleryItems.forEach(item => item.querySelector('img').addEventListener('error', e => e.currentTarget.classList.add('missing')));
const lock=document.querySelector('#lock'), site=document.querySelector('#site');
document.querySelector('#unlockForm').addEventListener('submit', e=>{
  e.preventDefault(); const value=document.querySelector('#pass').value.trim().toLowerCase();
  if(value===SITE_PASSWORD){lock.classList.add('hidden');site.classList.remove('hidden');showPage('home');}
  else {const hint=document.querySelector('#passHint');hint.textContent='كلمة المرور مش صحيحة،ي حبيبتي يوتي جربي تاني ♡';hint.style.color='#ff77b8';}
});
document.querySelector('.eye').addEventListener('click',()=>{const input=document.querySelector('#pass');input.type=input.type==='password'?'text':'password';});
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));document.querySelector('nav').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelector('.menu-btn').addEventListener('click',()=>document.querySelector('nav').classList.toggle('open'));
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');
  document.querySelectorAll('.gallery-item').forEach(item=>item.classList.toggle('hidden',button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter));
}));
document.querySelectorAll('.heart,#likeSong').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('liked');b.style.color=b.classList.contains('liked')?'#ff2f91':'';}));
const viewer=document.querySelector('#viewer'), viewerImg=viewer.querySelector('img');let current=0;
function imageAt(index){return galleryItems[index]?.querySelector('img');}
function imageExists(index){const image=imageAt(index);return image&&!image.classList.contains('missing')&&image.complete&&image.naturalWidth>0;}
function openViewer(index){if(!imageExists(index))return;current=index;viewer.classList.remove('hidden');updateViewer();}
function updateViewer(){viewerImg.src=imageAt(current).src;viewer.querySelector('.view-count').textContent=`${current+1} / ${galleryItems.length}`;}
function stepViewer(direction){for(let step=0;step<galleryItems.length;step++){current=(current+direction+galleryItems.length)%galleryItems.length;if(imageExists(current)){updateViewer();return;}}}
grid.addEventListener('click',e=>{const item=e.target.closest('.gallery-item');if(!item)return;const index=galleryItems.indexOf(item);if(imageExists(index)){item.classList.add('photo-tap');setTimeout(()=>item.classList.remove('photo-tap'),280);openViewer(index);}});
viewer.querySelector('.close-view').addEventListener('click',()=>viewer.classList.add('hidden'));
viewer.querySelector('.view-prev').addEventListener('click',()=>stepViewer(-1));
viewer.querySelector('.view-next').addEventListener('click',()=>stepViewer(1));
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.classList.add('hidden');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')viewer.classList.add('hidden');if(!viewer.classList.contains('hidden')&&e.key==='ArrowRight')stepViewer(1);if(!viewer.classList.contains('hidden')&&e.key==='ArrowLeft')stepViewer(-1);});
const audio=document.querySelector('#audio'), play=document.querySelector('#play');
play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play();play.textContent='Ⅱ';}catch{document.querySelector('.music-note').textContent='اضغطي مرة تانية لتشغيل الموسيقى ♡';}}else{audio.pause();play.textContent='▶';}});
audio.addEventListener('ended',()=>play.textContent='▶');

document.querySelectorAll('button,.primary').forEach(control=>control.addEventListener('pointerdown',event=>{
  const rect=control.getBoundingClientRect(), ripple=document.createElement('span');
  ripple.className='click-ripple';ripple.style.left=`${event.clientX-rect.left}px`;ripple.style.top=`${event.clientY-rect.top}px`;
  control.append(ripple);setTimeout(()=>ripple.remove(),650);
}));
