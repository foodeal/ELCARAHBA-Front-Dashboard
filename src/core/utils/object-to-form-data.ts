/* eslint-disable @typescript-eslint/no-explicit-any */
const isUndefined = (value: any) => value === undefined;

const isNull = (value: any) => value === null;

const isBoolean = (value: any) => typeof value === 'boolean';

const isObject = (value: any) => value === Object(value);

const isArray = (value: any) => Array.isArray(value);

const isDate = (value: any) => value instanceof Date;

const isBlob = (value: any) => value && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.slice === 'function';

const isFile = (value: any) =>
  isBlob(value) && typeof value.name === 'string' && (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number');

export interface Options {
  indices?: boolean;
  nullsAsUndefined?: boolean;
  booleansAsIntegers?: boolean;
  allowEmptyArrays?: boolean;
}

const serialize = (object: any, options?: any, existingFormData?: FormData, keyPrefix?: any) => {
  options = options || {};

  options.indices = isUndefined(options.indices) ? false : options.indices;

  options.nullsAsUndefined = isUndefined(options.nullsAsUndefined) ? false : options.nullsAsUndefined;

  options.booleansAsIntegers = isUndefined(options.booleansAsIntegers) ? false : options.booleansAsIntegers;

  options.allowEmptyArrays = isUndefined(options.allowEmptyArrays) ? false : options.allowEmptyArrays;

  existingFormData = existingFormData || new FormData();

  if (isUndefined(object)) {
    return existingFormData;
  } else if (isNull(object)) {
    if (!options.nullsAsUndefined) {
      existingFormData.append(keyPrefix || '', '');
    }
  } else if (isBoolean(object)) {
    if (options.booleansAsIntegers) {
      existingFormData.append(keyPrefix, object ? '1' : '0');
    } else {
      existingFormData.append(keyPrefix, object);
    }
  } else if (isArray(object)) {
    if (object.length) {
      object.forEach((value: any, index: any) => {
        const key = keyPrefix + '[' + (options.indices ? index : '') + ']';

        serialize(value, options, existingFormData, key);
      });
    } else if (options.allowEmptyArrays) {
      existingFormData.append(keyPrefix + '[]', '');
    }
  } else if (isDate(object)) {
    existingFormData.append(keyPrefix, object.toISOString());
  } else if (isObject(object) && !isFile(object) && !isBlob(object)) {
    Object.keys(object).forEach((prop) => {
      const value = object[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = keyPrefix ? keyPrefix + '[' + prop + ']' : prop;

      serialize(value, options, existingFormData, key);
    });
  } else {
    existingFormData.append(keyPrefix, object);
  }

  return existingFormData;
};

export function convertObjectToFormData(model: any): FormData {
  const options: Options = {
    indices: false,
    nullsAsUndefined: false,
    booleansAsIntegers: false,
    allowEmptyArrays: false,
  };

  return serialize(model, options);
}
