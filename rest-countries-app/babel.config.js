// export default {
//   presets: [
//     ['@babel/preset-env', { targets: { node: 'current' } }],
//     ['@babel/preset-react', { runtime: 'automatic' }]
//   ],
// };
export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: false // Important for ESM support
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
};