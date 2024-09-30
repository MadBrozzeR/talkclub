import fs from 'fs/promises';

const TYPE = {
  NUMBER: 'number',
  VARNUM: 'varnum',
  FLOAT: 'float',
  STRING: 'string',
  VARSTR: 'varstr',
  DATA: 'data',
} as const;

type Type = typeof TYPE[keyof typeof TYPE];

type DefaultTemplate<D> = D extends void ? null : D | null;

type Lengths = {
  [TYPE.NUMBER]: 1 | 2 | 4 | 6 | 8 | -1 | -2 | -4 | -6 | -8;
  [TYPE.FLOAT]: 16 | 32;
  [TYPE.STRING]: number;
};

type DataTypeTemplate<T extends Type, D = void> = T extends keyof Lengths ? {
  type: T;
  length: Lengths[T];
  default?: DefaultTemplate<D>;
} : {
  type: T;
  default?: DefaultTemplate<D>;
}

type DataType = (
  | DataTypeTemplate<typeof TYPE.NUMBER, number>
  | DataTypeTemplate<typeof TYPE.VARNUM, number>
  | DataTypeTemplate<typeof TYPE.FLOAT, number>
  | DataTypeTemplate<typeof TYPE.STRING, string>
  | DataTypeTemplate<typeof TYPE.VARSTR, string>
  | DataTypeTemplate<typeof TYPE.DATA, Buffer>
);

type Field = {
  [id: string]: DataType;
};

type Params = {
  fields: Field[];
};

export function use (file: string, params: Params) {
  fs.readFile(file).then(function (data) {
    console.log(data, params);
  });
}
