const esprima = require('esprima')
const escodegen = require('escodegen')
const fs = require('fs');


var starter = `("3"+{3:3})[3+3]+(""+{3:3})[3/3]+("3"+[3][3])[3-3/3]+("3"+!3)[3+3/3]+(""+!!3)[3-3]+(""+!!3)[3/3]+(""+!!3)[3-3/3]+("3"+{3:3})[3+3]+(""+!!3)[3-3]+(""+{3:3})[3/3]+(""+!!3)[3/3]`
var reterter = `("3"+!!3)[3/3+3/3]+("3"+!!3)[3+3/3]+("3"+!!3)[3/3]+("3"+!!3)[3]+("3"+!!3)[3-3/3]+("3"+[3][3])[3-3/3]`
var input = fs.readFileSync(process.argv[2],"utf8");

fs.writeFileSync(process.argv[3],TrieteriScript(input), "utf8");


//引数 ソース(String)
function TrieteriScript(code) {
    var base = esprima.parse(code);
    var spaced = escodegen.generate(base, {
        format: {
            indent: {
                style: '',
                base: 0,
                adjustMultilineComment: false
            },
            space: '',
            newline: ''
        }
    })
    base = spaced.replace(/`/g,"\\`");
    var ret = `(3)[${starter}][${starter}]((3)[${starter}][${starter}](${reterter}+" '"+`+"`"+base.split('').map((w)=>{
		var tmp = w.charCodeAt(0).toString(16)
		return "\\\\"+'`+("3"+[3][3])[3/3]+'+"(3-3)+".repeat(4-tmp.length)+""+(hexto3(tmp))+"+`"
    }).join('')+"`+"+`"'")())()`
    return ret;
}

function to3(num){
    var base3 = num.toString(3);
    var basearray = base3.split('');
    return '('.repeat(base3.length)+basearray.map((b)=>{
        var ret = "";
        switch(b){
            case '0':
                ret += '3-3'
                break;
            case '1':
                ret += '3/3';
                break;
            case '2':
                ret += '3-3/3';
                break;
            default:
                console.log("error "+num)
        }
        return ret
    }).join(')*3+')+')';
}

function hexto3(hex){
    var arr = hex.split('');
    return arr.map((t)=>{
        switch(t){
            case 'a':
                return `("3"+!3)[3/3+3/3]`;
            case 'b':
                return `("3"+{})[3-3/3+3/3]`
            case 'c':
                return `("3"+{})[3+3+3/3-3/3]`
            case 'd':
                return `("3"+[3][3])[3-3/3+3/3]`;
            case 'e':
                return `("3"+[3][3])[3+3/3]`;
            case 'f':
                return '("3"+[3][3])[3/3+3+3/3]'
            default:
                return `(${to3(parseInt(t))})`
        }
    }).join('+');
}