exports.utils = {
    sanitize: function (name) {
      name = name.trim().toLocaleLowerCase();
      name = name[0].toUpperCase() + name.slice(1);
  
      return name;
    },
  };