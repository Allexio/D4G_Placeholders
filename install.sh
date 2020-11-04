cd front/ 
echo "---- INSTALL FRONT ----"
npm install

echo "---- BUILD FRONT ----"
npx react-scripts build

cd .. 
echo "---- INSTALL BACK ----"
npm install

echo "---- NODE SERVER ----"
node src/index.js
