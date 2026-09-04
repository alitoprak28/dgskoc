const fs=require('fs'),zlib=require('zlib');
function decode(file){
  const b=fs.readFileSync(file);let i=8,idat=[],w,h,ct;
  while(i<b.length){const len=b.readUInt32BE(i);const t=b.toString('ascii',i+4,i+8);const d=b.slice(i+8,i+8+len);
    if(t==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);ct=d[9];}
    if(t==='IDAT')idat.push(d); if(t==='IEND')break; i+=12+len;}
  const raw=zlib.inflateSync(Buffer.concat(idat));const bpp=ct===6?4:3;const stride=w*bpp;
  const out=Buffer.alloc(h*stride);let p=0;
  for(let y=0;y<h;y++){const f=raw[p++];const line=raw.slice(p,p+stride);p+=stride;
    for(let x=0;x<stride;x++){const a=line[x];const L=x>=bpp?out[y*stride+x-bpp]:0;const c=y>0?out[(y-1)*stride+x]:0;const dd=(x>=bpp&&y>0)?out[(y-1)*stride+x-bpp]:0;let v;
      switch(f){case 0:v=a;break;case 1:v=a+L;break;case 2:v=a+c;break;case 3:v=a+((L+c)>>1);break;
      case 4:{const pp=L+c-dd,pa=Math.abs(pp-L),pb=Math.abs(pp-c),pc=Math.abs(pp-dd);v=a+((pa<=pb&&pa<=pc)?L:(pb<=pc?c:dd));break;}}
      out[y*stride+x]=v&255;}}
  return {w,h,bpp,stride,px:out};
}
module.exports={decode};
