const notFound = (req, res, next) => {
  res.status(404).sendFile('error.html', { root: './views/private' });
};

const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';
  
  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};

module.exports = {
  notFound,
  errorHandler,
  requestLogger
};