# vscode

```
Note: tested in version 1.18
Reference:  https://gist.github.com/dchowitz/83bdd807b5fa016775f98065b381ca4e
```

in .vscode dir create **tasks.json** file with: 

```
{
    "version": "0.1.0",
    "command": "npm",
    "isShellCommand": true,
    "args": ["run"],
    "showOutput": "silent",
    "tasks": [
        {
            "taskName": "compile",
            "isBuildCommand": false,
            "isTestCommand": false,
            "showOutput": "silent",
            "args": []
        }
    ]
}

```

in .vscode dir create **launch.json** file with:
```
{
    "version": "0.1.0",
    "configurations": [
        {
            "name": "debug",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/.compiled/src/index.js",
            "stopOnEntry": true,
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": "compile",
            "runtimeExecutable": null,
            "runtimeArgs": [
              "--nolazy"
            ],
            "env": {
              "NODE_ENV": "development"
            },
            "console": "internalConsole",
            "sourceMaps": true,
            "outDir": "${workspaceRoot}/.compiled"
          }
    ]
    
  }
```
in **package.json** add the following string into ***scripts***:
```
"compile": "rm -rf .compiled && babel src --out-dir .compiled/src"
```

debugging will take place in the ./compiled/src/index.js file. 