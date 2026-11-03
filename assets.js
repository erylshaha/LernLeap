/* Image paths (assets/meo/*) and yarn metrics. (classic script: shares one global scope, load order matters, see index.html) */
const ASSET={"sit": "assets/meo/sit.webp", "run": "assets/meo/run.webp", "sleep": "assets/meo/sleep.webp", "zzz": "assets/meo/zzz.webp", "ball": "assets/meo/ball.webp"},MET={"sitc": {"W": 1028, "H": 867, "cx": 0.39007782101167315, "cy": 0.6528258362168397, "r": 0.28696498054474706}, "runc": {"W": 1064, "H": 717, "cx": 0.8270676691729323, "cy": 0.15704323570432357, "r": 0.10037593984962406}, "sleepc": {"W": 1050, "H": 874, "cx": 0.38857142857142857, "cy": 0.6475972540045767, "r": 0.2819047619047619}};
ASSET.run="assets/meo/run.webp";ASSET.yarn="assets/meo/yarn.webp";ASSET.scat="assets/meo/scat.webp";
const fillAssets=(root=D)=>$$('img[data-asset]',root).forEach(i=>{if(!i.src)i.src=ASSET[i.dataset.asset]});
fillAssets();
