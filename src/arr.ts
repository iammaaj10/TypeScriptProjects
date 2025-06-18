// first method
let users:string[] = ['maaj ' , 'john' , 'snow'];  

// second method
let users1:Array<string> = ['Dany' , 'ironman']

// third method which is only read only
 let users2:ReadonlyArray<string>=['KingsLanding' , 'WinterFell'];

 users.push('Alfiya');
//  users2.push('HighTower') these is now allowed
 console.log(users);
 console.log(users2);

 // lets see the tuple example
// have to tell the each datatype here and it is hertrogenious
 let studentInfo:[number , string , string] = [21, 'Maaj' , '23UCS302'];
 console.log(studentInfo);
 