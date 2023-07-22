import { g, auth, config } from '@grafbase/sdk'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const User = g.model('User', {
  name: g.string().length({min:2, max:20}),
  email: g.email().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  gitUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(()=> Projects).list().optional(),

  // gravatar: g.url().resolver('user/gravatar')
})

const Projects = g.model('Project', {
  title: g.string().length({min:3}),
  description: g.string(),
  img: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User)
})

export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
