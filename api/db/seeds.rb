
  Page.create!(title: "Gmap to view friends", content: "To find Friends", allow_unauth: false) rescue nil


User.create!(email: 'ayan_mnc@yahoo.co.in', password: 'planned1',latitude:41.0082, longitude:28.9784)
User.create!(email: 'ayan.adhikary123@gmail.com', password: 'planned2',latitude:41.5582, longitude:29)

User.create!(email: 'test@gmail.com', password: 'testaaa2',latitude:41.9582, longitude:29)