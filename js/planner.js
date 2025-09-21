export function buildPlan({bw,wrist}){
  const pct=[0.65,0.70,0.73,0.75], reps=[12,10,10,8];
  const plan=[];
  for(let w=0;w<4;w++){
    plan[w]={
      Mon:[{name:"Swiss-bar bench", sets:3, reps:reps[w]},{name:"DB neutral press", sets:3, reps:reps[w]}],
      Tue:[{name:"TRX row", sets:5, reps:10},{name:"Commando plank", sets:3, reps:"45 s"}],
      Wed:[{name:"Safety-bar squat", sets:4, reps:reps[w]},{name:"Leg press", sets:3, reps:reps[w]}],
      Thu:[{name:"Air squat", sets:4, reps:20},{name:"Split squat", sets:3, reps:12}],
      Fri:[{name:"Chest-supported row", sets:4, reps:reps[w]},{name:"EZ preacher curl", sets:3, reps:reps[w]}],
      Sat:[{name:"Hip-hinge iso", sets:3, reps:"45 s"},{name:"Towel hang", sets:3, reps:"20 s"}],
      Sun:[]
    };
    if(wrist>=6) plan[w].Mon.unshift({name:"(Wrist swap) Backpack floor press", sets:3, reps:reps[w]});
  }
  return plan;
}