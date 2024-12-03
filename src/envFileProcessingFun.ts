enum stringTypes {
  none,
  multilineSingle,
  multilineDouble,
  single,
  double,
  notQuote,
  endOfSecret // use this when you have reached the end of the secret (it's to check if there is a comment there)
}
//note that the format of .env isn't 100% the same on all programming languages but this should probably work for most
export function removeValFromEnv(fileContents: string): string {
  function skipChar(qty: number) { //doesn't check if it reached the end of the file, the for loop will take care of that
    char += qty;

    line += Math.floor(char / contByLine[line].length);
    char %= contByLine[line].length;
  }

  function multilineCheck(quoteType: ("'" | '"')): void {
    if(contByLine[line].length - char+1 >= 2 && contByLine[line][char-1] !== '\\' && contByLine[line][char] === quoteType && contByLine[line][char+1] === quoteType && contByLine[line][char+2] ===  quoteType) {
      strType = stringTypes.endOfSecret;
      skipChar(2);
      
    } else if(line === contByLine.length-1 && char === contByLine[line].length-3) {//reached the end of the file
      throw new Error(`Invalid env file, there is a missing endquote for a multiline quote.`);
    }
  }
  function quoteCheck(quoteType: ("'" | '"')): void {
    //checks if the previous character is '\' (for escaping the quote) (doesn't matter if we check the previous character on the first iteration as it's guaranteed to be the opening double quote)
    if(contByLine[line][char] === quoteType && contByLine[line][char-1] !== '\\') {
      strType = stringTypes.endOfSecret;

    } else if(line === contByLine.length-1 && char === contByLine[line].length-1) {//reached the end of the file (and above isn't true)
      throw new Error(`Invalid env file, there is a missing endquote.`);
    }
  }

  //start
  const contByLine: string[] = fileContents.split('\n');

  const pattern = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$");//double check this regex (also rename it)
  let strType: stringTypes = stringTypes.none;

  let cleanContByLine: string = "";

  let line = 0;
  let char = 0;

  for(; line < contByLine.length; line++) {
    char = 0;
    for(; char < contByLine[line].length; char++) {
      if(contByLine[line][char] === '#' && (strType !== stringTypes.multilineDouble && strType !== stringTypes.multilineSingle && strType !== stringTypes.double && strType !== stringTypes.single)) {
        cleanContByLine += contByLine[line].slice(char, contByLine[line].length); 
        break;
      }
      
      //probably should break up each case into it's own function
      switch(strType) {
        case stringTypes.none:
          if(contByLine[line][char] === '=') {		
            //adds the variable name
            if(!pattern.test(contByLine[line].slice(0, char))) {
              throw new Error(`Invalid env file, the variable name in line number ${line + 1} is invalid.`);
            } else {
              cleanContByLine += contByLine[line].slice(0, char+1) + ' ';
            }
            
            //determines the type of value
            if(contByLine[line].length - char+1 >= 3) {

              if(contByLine[line][char+1] === '"' && contByLine[line][char+2] === '"' && contByLine[line][char+3] ===  '"') {
                strType = stringTypes.multilineDouble;
                skipChar(3);
              } else if(contByLine[line][char+1] === "'" && contByLine[line][char+2] === "'" && contByLine[line][char+3] === "'") {
                strType = stringTypes.multilineSingle;
                skipChar(3);
              }
            } 
            
            if(contByLine[line].length - char+1 >= 1) {//this check might be the issue
              
              if(contByLine[line][char+1] === '"') {
                strType = stringTypes.double;
                skipChar(1);
              } else if(contByLine[line][char+1] === "'") {
                strType = stringTypes.single;
                skipChar(1);
              }
            } 
            
            if(strType === stringTypes.none){
              strType = stringTypes.notQuote;
            }

          }
          break;

        case stringTypes.multilineDouble:
          multilineCheck('"');
          break;
        
        case stringTypes.multilineSingle:
          multilineCheck("'");
          break;

        case stringTypes.double:
          quoteCheck('"');
          break;

        case stringTypes.single:
          quoteCheck("'");
          break;
        
        case stringTypes.notQuote:
          //the code at the start should catch a comment
          if(contByLine[line][char] === ' ' || char >= contByLine[line].length-1) {
            strType = stringTypes.endOfSecret;
          } 
          //NOTE: having an equal sign in the unquoted value is valid
          break;
        
        case stringTypes.endOfSecret:
          //there should only be white space after the end of the secret (the code at the start of the for loop will catch the comment if it's there)					
          if(contByLine[line][char] !== ' ') {
            throw new Error(`Invalid env file, there should only be white space after the end of the secret on line ${line + 1}.`);
          }
          break;
      }				
    }
    if(strType === stringTypes.endOfSecret || strType === stringTypes.notQuote) {
      strType = stringTypes.none;
    }

    // create a new line if strType !== (multilineDouble, multilineSingle, double, single) and this isn't the last line
    if(strType !== stringTypes.multilineDouble && strType !== stringTypes.multilineSingle && strType !== stringTypes.single && strType !== stringTypes.double && line < contByLine.length-1) {
      cleanContByLine += '\n';
    }
  }

  return cleanContByLine;
}