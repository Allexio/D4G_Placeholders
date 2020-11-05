cd front/ 
echo "---- INSTALL FRONT ----"
yarn install

echo "---- BUILD FRONT ----"
REACT_APP_HOST="${PROTOCOLE}://${IP}" npx react-scripts build

cd .. 
echo "---- INSTALL BACK ----"
yarn install

echo "---- NODE SERVER ----"
production='true' node src/index.js
