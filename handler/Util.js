class Util {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }

    static removeCharacters(data) {
        const regex = new RegExp(/[\/\!\$\\\{\/}]/gim);
        return data.replace(regex, "");
    }
    static htmlClean(data) {
    const regex = /<([^>]+)>/gim;
    data = data.replace(/(<br?\s?\/>)/gim, "");
    return data.replace(regex, "");
    }

    static flatten(obj, ...props) {
        if (!isObject(obj)) return obj;

    const objProps = Object.keys(obj)
      .filter(k => !k.startsWith('_'))
      .map(k => ({ [k]: true }));

    props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);

    const out = {};

    for (let [prop, newProp] of Object.entries(props)) {
      if (!newProp) continue;
      newProp = newProp === true ? prop : newProp;

      const element = obj[prop];
      const elemIsObj = isObject(element);
      const valueOf = elemIsObj && typeof element.valueOf === 'function' ? element.valueOf() : null;

      // If it's a Collection, make the array of keys
      if (element instanceof require('./Collection')) out[newProp] = Array.from(element.keys());
      // If the valueOf is a Collection, use its array of keys
      else if (valueOf instanceof require('./Collection')) out[newProp] = Array.from(valueOf.keys());
      // If it's an array, flatten each element
      else if (Array.isArray(element)) out[newProp] = element.map(e => Util.flatten(e));
      // If it's an object with a primitive `valueOf`, use that value
      else if (typeof valueOf !== 'object') out[newProp] = valueOf;
      // If it's a primitive
      else if (!elemIsObj) out[newProp] = element;
    }

    return out;
    }
}

module.exports = Util;