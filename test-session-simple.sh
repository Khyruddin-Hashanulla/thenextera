#!/bin/bash

# Simple Session Authentication Test Script
# This script uses curl to test session-based authentication

# Configuration - Update these URLs for your deployment
API_URL="${API_URL:-https://nextera-vaaq.onrender.com}"
FRONTEND_URL="${FRONTEND_URL:-https://thenextera.in}"
TEST_EMAIL="${TEST_EMAIL:-test@example.com}"
TEST_PASSWORD="${TEST_PASSWORD:-testpassword123}"

echo "🚀 Starting Session Authentication Test"
echo "📍 API URL: $API_URL"
echo "🌐 Frontend URL: $FRONTEND_URL"
echo ""

# Create a cookie jar to store session cookies
COOKIE_JAR="/tmp/session_test_cookies.txt"
rm -f "$COOKIE_JAR"

echo "1️⃣ Testing session debug endpoint (before login)..."
curl -s -c "$COOKIE_JAR" \
  -H "Origin: $FRONTEND_URL" \
  -H "Referer: $FRONTEND_URL" \
  "$API_URL/debug/session" | jq '.' 2>/dev/null || echo "Response received (install jq for pretty formatting)"
echo ""

echo "2️⃣ Attempting login..."
LOGIN_RESPONSE=$(curl -s -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: $FRONTEND_URL" \
  -H "Referer: $FRONTEND_URL" \
  -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}" \
  "$API_URL/auth/login")

if echo "$LOGIN_RESPONSE" | grep -q "success\|token\|user"; then
  echo "✅ Login successful!"
  echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"
else
  echo "❌ Login failed!"
  echo "$LOGIN_RESPONSE"
  exit 1
fi
echo ""

echo "3️⃣ Testing session debug endpoint (after login)..."
curl -s -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -H "Origin: $FRONTEND_URL" \
  -H "Referer: $FRONTEND_URL" \
  "$API_URL/debug/session" | jq '.' 2>/dev/null || echo "Response received"
echo ""

echo "4️⃣ Testing protected route (GET /api/courses)..."
COURSES_RESPONSE=$(curl -s -c "$COOKIE_JAR" -b "$COOKIE_JAR" \
  -H "Origin: $FRONTEND_URL" \
  -H "Referer: $FRONTEND_URL" \
  "$API_URL/api/courses")

if echo "$COURSES_RESPONSE" | grep -q "\[\|courses\|title"; then
  echo "✅ Protected route accessible!"
  echo "Courses response received"
else
  echo "❌ Protected route failed!"
  echo "$COURSES_RESPONSE"
  exit 1
fi
echo ""

echo "5️⃣ Checking session cookie..."
if [ -f "$COOKIE_JAR" ]; then
  echo "Session cookies:"
  cat "$COOKIE_JAR" | grep connect.sid || echo "No connect.sid cookie found"
else
  echo "No cookie jar found"
fi
echo ""

echo "🎉 Session authentication test completed!"
echo ""
echo "🧹 Cleaning up..."
rm -f "$COOKIE_JAR"

echo "✅ If you see successful responses above, your session authentication is working!"
echo "❌ If you see errors, check the deployment guide for troubleshooting steps."
