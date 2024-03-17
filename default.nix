# I'm not a nix user. What is this?
#
# This is a nix-shell file. It's a way to specify a development environment
# that is reproducible and isolated from your system. It's like a virtualenv
# for python, but for your whole system.
#
# It serves as a single source of truth for the dependencies of a project.
# You are free to ignore it.

# Help! I'm a nix user and it isn't working!
#
# try running these commands:
# sudo nix-channel --add https://nixos.org/channels/nixos-unstable nixos-unstable
# sudo nix-channel --update
# then run nix-shell again

let
  unstable = import <nixos-unstable> { config = { allowUnfree = true; }; };
in
{ nixpkgs ? import <nixpkgs> { } }:
with nixpkgs; mkShell {
  DOCKER_BUILDKIT = "1";
  buildInputs = [
    unstable.bun
    nodejs_20
    flyctl
    libgcc
    turso-cli
    sqld
  ];
}
