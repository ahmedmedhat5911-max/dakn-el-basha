
(function(){
  // تكبير الصورة
  var lb=document.getElementById('lb'),lbi=lb.querySelector('img');
  document.querySelectorAll('.zoom').forEach(function(b){
    b.addEventListener('click',function(){lbi.src=b.querySelector('img').src;lb.classList.add('on');lb.scrollTop=0;document.body.style.overflow='hidden'});
  });
  function closeLb(){lb.classList.remove('on');document.body.style.overflow=''}
  lb.addEventListener('click',closeLb);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb()});

  // تمييز القسم الحالي في الشريط
  var links=[].slice.call(document.querySelectorAll('#nav a'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(a){
            var on=a.getAttribute('href')==='#'+e.target.id;
            a.classList.toggle('on',on);
            if(on)a.scrollIntoView({block:'nearest',inline:'center'});
          });
        }
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    document.querySelectorAll('.card').forEach(function(c){io.observe(c)});
  }

  // لوحة الطباعة
  document.getElementById('plogo').src=document.getElementById('logo').src;
  var input=document.getElementById('url');
  try{input.value=location.protocol.indexOf('http')===0?location.href.split('#')[0]:''}catch(e){}
  function qr(){
    var box=document.getElementById('qr'),v=input.value.trim()||location.href.split('#')[0];
    box.innerHTML='';
    try{new QRCode(box,{text:v,width:460,height:460,colorDark:'#000000',colorLight:'#f4f6f8',correctLevel:QRCode.CorrectLevel.H})}
    catch(e){box.textContent='تعذر إنشاء الكود'}
  }
  function route(){
    var p=location.hash==='#poster';
    document.body.classList.toggle('is-poster',p);
    if(p)qr();
  }
  input.addEventListener('input',qr);
  document.getElementById('printBtn').addEventListener('click',function(){window.print()});
  window.addEventListener('hashchange',route);
  route();
})();
