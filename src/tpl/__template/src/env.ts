const vite_env = import.meta.env;
//console.log('vite_env', vite_env)

let Environment = {
  mode: vite_env.MODE,
  run_at: vite_env.VITE_RUN_AT,
}
console.log('env', Environment)
export default Environment;
