//==============GENERATE SEQUENCE=========================//
function generateSequence(seqLength){
  let sequence = [];
  // Populate random sequence with numbers between 1 and 4.
  // loop currently set to 8 but can use skill level when this has been implemented
  for (i = 0; i < seqLength; i++) {
      //math.random returns number between 0 and 1. 
      //I have multiplied this by 4 and then use math.floor to round it down to the nearest whole number.
      //I have then added 1. This ensures that the number is always between 1 and 4
      sequence.push(Math.floor(Math.random() * 4) + 1);
  }

  return sequence;

}