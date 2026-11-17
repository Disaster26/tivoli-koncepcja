(function(){
  var b=document.querySelector('.burger'),panel=document.getElementById('panel');
  function zamknij(){b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');panel.classList.remove('otw');document.body.style.overflow=''}
  b.addEventListener('click',function(){if(b.getAttribute('aria-expanded')==='true'){zamknij()}else{b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','Zamknij menu');panel.classList.add('otw');document.body.style.overflow='hidden'}});
  panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij)});

  var mob=document.getElementById('mob'),cta=document.getElementById('cta-hero');
  if('IntersectionObserver' in window){var top=document.querySelector('.top');new IntersectionObserver(function(e){var po=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;mob.classList.toggle('widac',po);top.classList.toggle('po',po)}).observe(cta)}

  var linki=document.querySelectorAll('.menu a'),ids=['lokale','menu','o-tivoli','promocje','imprezy','kontakt'],sek=ids.map(function(i){return document.getElementById(i)});
  var czeka=false;
  function akt(){czeka=false;var y=window.innerHeight*.35,id='';sek.forEach(function(s){if(s.getBoundingClientRect().top<=y)id=s.id});if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)id='kontakt';linki.forEach(function(a){a.classList.toggle('on',id?a.getAttribute('href')==='#'+id:a.getAttribute('href')==='#')})}
  window.addEventListener('scroll',function(){if(!czeka){czeka=true;requestAnimationFrame(akt)}},{passive:true});

  document.querySelectorAll('.pas,.lokale,.dania').forEach(function(p){
    var start=0,sl=0,ciag=false,ruch=0;
    p.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||p.scrollWidth<=p.clientWidth+2)return;ciag=true;ruch=0;start=e.clientX;sl=p.scrollLeft;p.classList.add('ciag')});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var d=e.clientX-start;ruch=Math.max(ruch,Math.abs(d));p.scrollLeft=sl-d});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;p.classList.remove('ciag')});
    p.addEventListener('click',function(e){if(ruch>6){e.stopPropagation();e.preventDefault();ruch=0}},true);
    p.addEventListener('dragstart',function(e){e.preventDefault()});
  });

  var lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p'),lista=[],nr=0,ostatni=null;
  function pokaz(){var im=lista[nr];lbi.src=im.dataset.full;lbi.alt=im.alt;lbp.textContent=im.alt+'  ('+(nr+1)+' / '+lista.length+')'}
  document.querySelectorAll('img[data-full]').forEach(function(im){im.addEventListener('click',function(){lista=[].slice.call(document.querySelectorAll('img[data-g="'+im.dataset.g+'"]'));nr=lista.indexOf(im);ostatni=im;pokaz();lb.classList.add('otw');document.body.style.overflow='hidden';lb.querySelector('.zamk').focus()})});
  function zamk(){lb.classList.remove('otw');document.body.style.overflow='';lbi.removeAttribute('src')}
  function kr(k){nr=(nr+k+lista.length)%lista.length;pokaz()}
  lb.querySelector('.zamk').addEventListener('click',zamk);
  lb.querySelector('.pop').addEventListener('click',function(){kr(-1)});
  lb.querySelector('.nast').addEventListener('click',function(){kr(1)});
  lb.addEventListener('click',function(e){if(e.target===lb)zamk()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('otw'))return;if(e.key==='Escape')zamk();if(e.key==='ArrowLeft')kr(-1);if(e.key==='ArrowRight')kr(1)});
  var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)kr(d<0?1:-1)});
})();
