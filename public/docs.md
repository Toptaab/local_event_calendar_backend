
### user ### 


POST user/register   register a new user ### for user
REQUEST BODY
{
  userName          string    user first name
  email             string    email address
  password          string    password must contain only alphabet ** if user register by email"
  role              string    USER
  lineToken?        string    lineToken form line api ** if user register by line (don't need password)**
  gender            enum      {MALE, FEMALE, OTHER}

}
RESPONSE
201
  {
    accessToken     string    10 day expire
    user            object    {userName, email,isVerify, role, lineToken, gender}
  }




POST user/register/organizer   register a new user ### for organizer
REQUEST BODY
{
  userName          string    user first name
  email             string    email address
  password          string    password must contain only alphabet ** if user register by email"
  role              string    USER
  lineToken         string    lineToken form line api ** if user register by line (don't need password)**
  gender            enum      {MALE, FEMALE, OTHER}
  OrganizerInformation : 
  {
    officialName    string    organizer name
    corporation     enum      {INDIVIDUAL, CORPORATION}
    companyNumber?  number    13 digi
  }
}
RESPONSE
201
    {
    accessToken     string    10 day expire
    user            object    {userName, email,isVerify, role, lineToken, gender}
    }

PATCH user/organizer/:organizerId/image   upload organizer image after register success ### for organizer
REQUEST BODY
{
  identityCopyImage        mulform    identityCopyImage image
  profileImage             mulform    profile image
}
RESPONSE
201
    {
    message: "update success"
    }



POST user/login                         user login by email
REQUEST BODY
{
    email                  string      
    password               string       
}
RESPONSE
201
    {
    accessToken     string    10 day expire
    }




GET user/:userId                          get user OrganizerInformation
RESPONSE
201
    {
    user                        object    {userName, email,isVerify, role, lineToken, gender} 
    UserAddress?                object    {address, address2, provice, district, subDistrict}
    OrganizerInformation?       object    {officialName, corporation, companyNumber, profileImage}
    }




PATCH user/:userId                         update for user information
REQUEST
HEADER
  AUTHORIZATION           Bearer [JWT]
BODY
{
    data                  object            can update {userName,email,isVerify,role,lineToken,gender,password }
    UserAddress?          object            can update {address, address2, provice, district, subDistrict}
}
RESPONSE
201
    {
    message: "Update Success"
    }



PATCH user/organizer/:organizerId                        update for organizer information
REQUEST
HEADER
  AUTHORIZATION           Bearer [JWT]
BODY
{
    OrganizerInformation       object    can update {officialName, corporation, companyNumber}
}




####  event  #####
GET event/                    get allEvent
RESPONSE
201
    [
      event                   object      {id, coverImage, title, description, startDate, endDate, timePeriod, isYearly, isPublish,isExpire, telNumber, website, email, facebook,   }
      EventAddress            object      {officialName, profileImage}
      organizerInformation    object      {officialName, profileImage}
      HighlightEvent?         object
      EventFacility           object
      eventType               object      {name}
    ]

 


GET event/:eventId            get event by eventId
RESPONSE
200
    {
      event                   object    {id, coverImage, title, description, startDate, endDate, timePeriod, isYearly, isPublish,isExpire, telNumber, website, email, facebook,   }
      EventImage              array
      EventAddress            object
      organizerInformation    object    {officialName, profileImage}
      HighlightEvent?         object    
      EventFacility           object    
      <!-- UserAddress?            object    {address, address2, provice, district, subDistrict}  ask for more if needed--> 
      OrganizerInformation?   object    {officialName, corporation, companyNumber, profileImage}
      eventType               object    {name}
      report                  array
    }


POST event/                   create new Event
REQUEST
HEADER
  AUTHORIZATION           Bearer [JWT]
BODY
{
  organizerInformationId      number
  coverImage                  string
  title                       string
  description?                string
  startDate                   datetime
  endDate                     datetime
  isYearly                    boolean
  isPublic                    boolean
  eventTypeId                 number
  telNumber?                  string
  website
}




