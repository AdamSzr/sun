import validator from 'validator';
import getFunctionDocs from './validatorDocs';
import {} from './../../../../utils/let';


export type DynamicRoute<T> = {
  params: Promise<T>
};

type ValidatorDynamicRoute = DynamicRoute<{fn:string}>;

export async function POST(request:Request, {params}: ValidatorDynamicRoute ) {
  const { text, args = []}= await request.json();
  const { fn } = await params;


  return Response.json({
    result: (validator as any)[fn](text, ...args)
  });
}

const fnParamRegex = /\((?<fnParams>.+)\)/;
export async function OPTIONS(request:Request, {params}: ValidatorDynamicRoute) {
  const { fn } = await params;
  const z = (Number(5));

  const fnDocs = getFunctionDocs(fn) ?? {};
  return Response.json({
    result: true,
    ...fnDocs
  });
}
