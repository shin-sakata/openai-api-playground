{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      nodejs = pkgs.nodejs-slim-18_x;
      pythonEnv = pkgs.python3.withPackages (p: [
        p.openai
        p.autopep8
        p.pydantic
      ]);
    in
    {
      devShells.default = pkgs.mkShell {
        packages = [
          nodejs
          (pkgs.yarn.override { inherit nodejs; })
          pythonEnv
        ];
        PYTHONPATH = "${pythonEnv}/${pythonEnv.sitePackages}";
      };
    }
  );
}
