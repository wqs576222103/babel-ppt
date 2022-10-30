const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const t = require("@babel/types");
const generator = require("@babel/generator");

const code = `
const dt = 1;
console.log(dt);
function add(x, y) {
    return x + y
}
`;
const ast = parser.parse(code, {
  sourceType: "script", //  "script" | "module"
  plugins: [], // default []
});

traverse.default(ast, {
  // 进入节点时调用
  // 参数 path：表示两个节点之间 连接 的 对象
  enter(path) {},
  // 离开节点调用
  exit(path) {},
  // child node types
  VariableDeclaration: function (path) {
    path.traverse(
      {
        NumericLiteral: function (path) {
          path.node.value = this.value;
        },
      },
      { value: 100 }
    );
  },

  CallExpression: function (path) {
    if (t.isIdentifier(path.node.callee.object, { name: "console" })) {
      path.remove();
    }
  },

  FunctionDeclaration: {
    enter(path) {
      if ((path.node.id.name = "add")) {
        path.node.id.name = "sum";
      }
    },
    exit(path) {},
  },

  BinaryExpression: function (path) {
    if (path.node.operator === "+") {
      path.replaceWith(
        t.binaryExpression("*", path.node.left, path.node.right)
      );
    }
  },
  // // 会覆盖child node 遍历方式
  // "FunctionDeclaration|ReturnStatement": function (path) {
  // },
});

const _code = generator.default(ast).code;
console.log(_code)
// const dt = 100;
// function sum(x, y) {
//   return x * y;
// }