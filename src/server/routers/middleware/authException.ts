export const AuthException = function(message) {
  this.message = message;
  this.name = 'VH_AUTH_ERR';
};
