export default class ENV {
  public static MY_ENVIRONMENT_VARIABLE: string =  process.env['MY_ENVIRONMENT_VARIABLE'] ?? 'my default value';
}
