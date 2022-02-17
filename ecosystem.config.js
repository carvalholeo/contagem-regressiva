module.exports = {
  apps: [
    {
      name: 'contagem-api',
      script: './server.js',
      args: '--use-strict',
      instances: 1,
      cron_restart: '0 0 * * *',
      increment_var: 'PORT',
      exec_mode: 'cluster',
      env: {
        'PORT': 7000,
        'NODE_ENV': 'production',
      },
    },
  ],
};
