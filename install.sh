cd front/ 
echo "---- INSTALL FRONT ----"
npm install

echo "---- BUILD FRONT ----"
REACT_APP_HOST="${PROTOCOLE}://${IP}" npx react-scripts build

cd .. 
echo "---- INSTALL BACK ----"
npm install

echo "---- NODE SERVER ----"
production='true' node src/index.js
