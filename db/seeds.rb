puts "==== Create User ===="
User.destroy_all
  ActiveRecord::Base.connection.execute(
    "ALTER SEQUENCE users_id_seq RESTART WITH 1"
  )
User.create!([ 
  { email: 'yunchang@example.com',
    password: '123123123',
    password_confirmation:  '123123123'
  },
  { email: 'theo@example.com',
    password: '123123123',
    password_confirmation:  '123123123'
  },
  { email: 'smith@example.com',
    password: '123123123',
    password_confirmation:  '123123123'
  }
    ])

puts "==== End ===="