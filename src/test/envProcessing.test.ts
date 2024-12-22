import { removeValFromEnv } from '../envFileProcessingFun';
import {describe, it, expect} from '@jest/globals';

describe('env File Processing', () => {

  it('can handle unquoted values', () => {
    expect(removeValFromEnv("key_key12=a")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12=a     ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12=a#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12=a #some comment")).toEqual("key_key12= #some comment");

    expect(removeValFromEnv("key=value")).toEqual("key= ");
    expect(removeValFromEnv("key=value#comment")).toEqual("key= #comment");
    expect(removeValFromEnv("key=value #comment")).toEqual("key= #comment");


    expect(removeValFromEnv("key_key12=longervalue ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12=longervalue #some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12=longervalue#some comment")).toEqual("key_key12= #some comment");
    
    
    //written this way to avoid unintended whitespace characters being added
    expect(removeValFromEnv(
`key=value
key=value`)).toEqual(
`key= 
key= `);
  });

  it('can handle no values', () => {
    expect(removeValFromEnv("key_key12=#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12= #some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12=      #some comment")).toEqual("key_key12= #some comment");
  
  });
  
  it('can handle double quoted values', () => {
    expect(removeValFromEnv('key_key12="a"')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="a"     ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="a"#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="a" #some comment')).toEqual('key_key12= #some comment');

    expect(removeValFromEnv('key="value"')).toEqual('key= ');
    expect(removeValFromEnv('key="value"#comment')).toEqual('key= #comment');
    expect(removeValFromEnv('key="value" #comment')).toEqual('key= #comment');


    expect(removeValFromEnv('key_key12="longervalue" ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="longervalue" #some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="longervalue"#some comment')).toEqual('key_key12= #some comment');
    
    //multiline
    expect(removeValFromEnv('key_key12="longer\n#value\nvalue" ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="longer\n\nvalue"#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="longer\n#value\nvalue"#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="longer\n#value\n\n\n\n#other comment inside a value\nvalue"#some comment')).toEqual('key_key12= #some comment');
  });

  it('can handle double quoted multiline values', () => {
    expect(removeValFromEnv('key_key12="""a"""')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="""a"""     ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="""a"""#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="""a""" #some comment')).toEqual('key_key12= #some comment');

    expect(removeValFromEnv('key="""value"""')).toEqual('key= ');
    expect(removeValFromEnv('key="""value"""#comment')).toEqual('key= #comment');
    expect(removeValFromEnv('key="""value""" #comment')).toEqual('key= #comment');


    expect(removeValFromEnv('key_key12="""longervalue""" ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="""longervalue""" #some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="""longervalue"""#some comment')).toEqual('key_key12= #some comment');
    
    //multiline
    expect(removeValFromEnv('key_key12="""longer\n#value\nvalue""" ')).toEqual('key_key12= ');
    expect(removeValFromEnv('key_key12="""longer\n\nvalue"""#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="""longer\n#value\nvalue"""#some comment')).toEqual('key_key12= #some comment');
    expect(removeValFromEnv('key_key12="""longer\n#value\n\n\n\n#other comment inside a value\nvalue"""#some comment')).toEqual('key_key12= #some comment');
  });
    
  it('can handle single quoted values', () => {
    expect(removeValFromEnv("key_key12='a'")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='a'     ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='a'#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='a' #some comment")).toEqual("key_key12= #some comment");

    expect(removeValFromEnv("key='value'")).toEqual("key= ");
    expect(removeValFromEnv("key='value'#comment")).toEqual("key= #comment");
    expect(removeValFromEnv("key='value' #comment")).toEqual("key= #comment");


    expect(removeValFromEnv("key_key12='longervalue' ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='longervalue' #some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='longervalue'#some comment")).toEqual("key_key12= #some comment");

    //multiline
    expect(removeValFromEnv("key_key12='longer\n#value\nvalue' ")).toEqual('key_key12= ');
    expect(removeValFromEnv("key_key12='longer\n\nvalue'#some comment")).toEqual('key_key12= #some comment');
    expect(removeValFromEnv("key_key12='longer\n#value\nvalue'#some comment")).toEqual('key_key12= #some comment');
    expect(removeValFromEnv("key_key12='longer\n#value\n\n\n\n#other comment inside a value\nvalue'#some comment")).toEqual('key_key12= #some comment');
    
  });
  
  it('can handle single quoted multiline values', () => {
    expect(removeValFromEnv("key_key12='''a'''")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='''a'''     ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='''a'''#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='''a''' #some comment")).toEqual("key_key12= #some comment");

    expect(removeValFromEnv("key='''value'''")).toEqual("key= ");
    expect(removeValFromEnv("key='''value'''#comment")).toEqual("key= #comment");
    expect(removeValFromEnv("key='''value''' #comment")).toEqual("key= #comment");


    expect(removeValFromEnv("key_key12='''longervalue''' ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='''longervalue''' #some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='''longervalue'''#some comment")).toEqual("key_key12= #some comment");

    //multiline
    expect(removeValFromEnv("key_key12='''longer\n#value\nvalue''' ")).toEqual("key_key12= ");
    expect(removeValFromEnv("key_key12='''longer\n\nvalue'''#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='''longer\n#value\nvalue'''#some comment")).toEqual("key_key12= #some comment");
    expect(removeValFromEnv("key_key12='''longer\n#value\n\n\n\n#other comment inside a value\nvalue'''#some comment")).toEqual("key_key12= #some comment");
  });

  it('preserves empty lines', () => {
    expect(removeValFromEnv("")).toEqual("");
    expect(removeValFromEnv("\n\n\n")).toEqual("\n\n\n");
    expect(removeValFromEnv("\ntest='a\n\na\n'\n\n")).toEqual("\ntest= \n\n");
    expect(removeValFromEnv(
`
test='a

a
'

`)).toEqual(
`
test= 

`);

  });

  
  it('can handle escape characters, unquoted value', () => {
    expect(removeValFromEnv("key=\\'")).toEqual("key= ");
    expect(removeValFromEnv("key=som\\'ething\\'")).toEqual("key= ");
    expect(removeValFromEnv("key=something\\'")).toEqual("key= ");
    expect(removeValFromEnv("key=som\\'ething")).toEqual("key= ");
    expect(removeValFromEnv("key=\\'som\\'ething")).toEqual("key= ");

    expect(removeValFromEnv('key=\\"')).toEqual('key= ');
    expect(removeValFromEnv('key=som\\"ething\\"')).toEqual('key= ');
    expect(removeValFromEnv('key=something\\"')).toEqual('key= ');
    expect(removeValFromEnv('key=som\\"ething')).toEqual('key= ');
    expect(removeValFromEnv('key=\\"som\\"ething')).toEqual('key= ');
  });

  it('can handle escape characters, single quoted value', () => {
    expect(removeValFromEnv("key='\\''")).toEqual("key= ");
    expect(removeValFromEnv("key='som\\'ething\\''")).toEqual("key= ");
    expect(removeValFromEnv("key='something\\''")).toEqual("key= ");
    expect(removeValFromEnv("key='som\\'ething'")).toEqual("key= ");
    expect(removeValFromEnv("key='\\'som\\'ething'")).toEqual("key= ");

    expect(removeValFromEnv('key=\'\\"\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'som\\"ething\\"\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'something\\"\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'som\\"ething\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'\\"som\\"ething\'')).toEqual('key= ');
  });
  
  it('can handle escape characters, double quoted value', () => {
    expect(removeValFromEnv("key=\"\\'\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"som\\'ething\\'\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"something\\'\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"som\\'ething\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"\\'som\\'ething\"")).toEqual("key= ");

    expect(removeValFromEnv('key="\\""')).toEqual('key= ');
    expect(removeValFromEnv('key="som\\"ething\\""')).toEqual('key= ');
    expect(removeValFromEnv('key="something\\""')).toEqual('key= ');
    expect(removeValFromEnv('key="som\\"ething"')).toEqual('key= ');
    expect(removeValFromEnv('key="\\"som\\"ething"')).toEqual('key= ');
  });

  it('can handle escape characters, single multiline quoted value', () => {
    expect(removeValFromEnv("key='''\\''''")).toEqual("key= ");
    expect(removeValFromEnv("key='''som\\'ething\\''''")).toEqual("key= ");
    expect(removeValFromEnv("key='''something\\''''")).toEqual("key= ");
    expect(removeValFromEnv("key='''som\\'ething'''")).toEqual("key= ");
    expect(removeValFromEnv("key='''\\'som\\'ething'''")).toEqual("key= ");

    expect(removeValFromEnv('key=\'\'\'\\"\'\'\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'\'\'som\\"ething\\"\'\'\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'\'\'something\\"\'\'\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'\'\'som\\"ething\'\'\'')).toEqual('key= ');
    expect(removeValFromEnv('key=\'\'\'\\"som\\"ething\'\'\'')).toEqual('key= ');
    
    expect(removeValFromEnv("key='''\\'\n'''")).toEqual("key= ");
    expect(removeValFromEnv("key='''som\\'e\nthing\\''''")).toEqual("key= ");
    expect(removeValFromEnv("key='''somet\nhing\\''''")).toEqual("key= ");
    expect(removeValFromEnv("key='''som\\'eth\ning'''")).toEqual("key= ");
    expect(removeValFromEnv("key='''\\'som\n\\'\nething'''")).toEqual("key= ");

  });
  it('can handle escape characters, double multiline quoted value', () => {
    expect(removeValFromEnv("key=\"\"\"\\'\"\"\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"\"\"som\\'ething\\'\"\"\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"\"\"something\\'\"\"\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"\"\"som\\'ething\"\"\"")).toEqual("key= ");
    expect(removeValFromEnv("key=\"\"\"\\'som\\'ething\"\"\"")).toEqual("key= ");

    expect(removeValFromEnv('key=\"\"\"\\"\"\"\"')).toEqual('key= ');
    expect(removeValFromEnv('key="""som\\"ething\\""""')).toEqual('key= ');
    expect(removeValFromEnv('key="""something\\""""')).toEqual('key= ');
    expect(removeValFromEnv('key="""som\\"ething"""')).toEqual('key= ');
    expect(removeValFromEnv('key="""\\"som\\"ething"""')).toEqual('key= ');

    expect(removeValFromEnv('key=\"\"\"\n\\"\n\"\"\"')).toEqual('key= ');
    expect(removeValFromEnv('key="""som\\"ethi\nng\\""""')).toEqual('key= ');
    expect(removeValFromEnv('key="""som\nething\\""""')).toEqual('key= ');
    expect(removeValFromEnv('key="""som\n\\"ething"""')).toEqual('key= ');
    expect(removeValFromEnv('key="""\\"som\\"\nething"""')).toEqual('key= ');
  });
});
