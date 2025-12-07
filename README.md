# Modern Blog Application

A clean, minimalist blog platform built with React, Vite, and Appwrite. Features a modern UI with styled-components and full CRUD functionality for blog posts.

## ✨ Features

- **User Authentication** - Secure signup/login with Appwrite
- **Post Management** - Create, read, update, and delete blog posts
- **Rich Text Editor** - TinyMCE integration for content creation
- **Image Uploads** - Featured images for each post
- **Responsive Design** - Mobile-first approach with styled-components
- **Protected Routes** - Authentication-based access control
- **Modern UI** - Clean, minimal design with smooth transitions

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Backend**: Appwrite (BaaS)
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form
- **Rich Text**: TinyMCE
- **Icons**: React Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mega-todo-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Configure Appwrite**
   
   In your Appwrite console:
   - Create a new project
   - Create a database and collection with these attributes:
     - `title` (string, required)
     - `content` (string, required)
     - `featuredImage` (string, required)
     - `status` (string, required)
     - `userID` (string, required)
   - Create a storage bucket for images
   - Set appropriate permissions

5. **Update TinyMCE API Key**
   
   In `src/component/RTE.jsx`, replace the API key with your own:
   ```javascript
   apiKey='your_tinymce_api_key'
   ```

## 🎯 Running the Application

**Development mode:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── appwrite/          # Appwrite service configurations
│   ├── auth.js        # Authentication service
│   └── config.js      # Database & storage service
├── component/         # Reusable components
│   ├── header/        # Header and navigation
│   ├── footer/        # Footer component
│   ├── container/     # Container wrapper
│   ├── postForm/      # Post creation/edit form
│   ├── authLayout.jsx # Protected route wrapper
│   ├── button.jsx     # Custom button component
│   ├── input.jsx      # Custom input component
│   ├── select.jsx     # Custom select component
│   ├── login.jsx      # Login form
│   ├── signup.jsx     # Signup form
│   ├── postCard.jsx   # Post preview card
│   ├── RTE.jsx        # Rich text editor
│   └── logo.jsx       # Logo component
├── pages/             # Page components
│   ├── Home.jsx       # Homepage with post grid
│   ├── AllPost.jsx    # All posts listing
│   ├── AddPost.jsx    # Create new post
│   ├── EditPost.jsx   # Edit existing post
│   ├── Post.jsx       # Single post view
│   ├── Login.jsx      # Login page
│   └── Signup.jsx     # Signup page
├── store/             # Redux store
│   ├── authSlice.js   # Authentication state
│   └── store.js       # Store configuration
├── conf/              # Configuration
│   └── conf.js        # Environment variables
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Design Philosophy

This application follows a **minimal design approach**:

- **Clean Typography** - Clear hierarchy with modern fonts
- **Subtle Colors** - Light backgrounds with accent colors for CTAs
- **Smooth Transitions** - Polished interactions without being distracting
- **Consistent Spacing** - Predictable rhythm throughout the UI
- **Mobile-First** - Responsive design that scales elegantly
- **Purposeful Animations** - Motion that enhances UX, not decorates

## 🔐 Authentication Flow

1. User signs up with email, password, and name
2. Appwrite creates account and session
3. Redux stores user data
4. Protected routes become accessible
5. User can create/edit/delete their own posts

## 📝 Post Management

- **Create**: Rich text editor with image upload
- **Read**: Browse all posts or view individual posts
- **Update**: Edit your own posts (author-only access)
- **Delete**: Remove posts with cascade image deletion

## 🔒 Security Features

- Protected routes with authentication checks
- Author-only edit/delete permissions
- Secure session management via Appwrite
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Known Issues

- Ensure Appwrite permissions are correctly set for collections and storage
- TinyMCE requires an API key for production use
- Image previews require proper CORS configuration in Appwrite

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check Appwrite documentation
- Review TinyMCE documentation

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) - Backend as a Service
- [TinyMCE](https://www.tiny.cloud/) - Rich text editor
- [Styled Components](https://styled-components.com/) - Component styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

---

**Built with ❤️ using React and modern web technologies**
