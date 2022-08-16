const isValidPattern = (pattern: RegExp | undefined, field: string) => {
    return pattern ? pattern.test(field) : true;
  };
  
  export default isValidPattern;