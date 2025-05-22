import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

test("blog renders just the blog's title and author by default", async () => {
  const blogExample = {
    title: 'test blog',
    author: 'testAuthor',
    likes: 0,
    url: 'test.com',
    user: [{ name: 'testDbUser', username: 'testDbUsername' }]
  };
  const user = { username: 'testDbUsername' };
  const { container } = render(
    <Blog blog={blogExample} user={user} getBlogs={() => jest.fn()} />
  );
  const blogGlance = container.querySelector('.blogGlance');
  expect(blogGlance).toBeVisible(); //primary blog infos
  expect(blogGlance.querySelector('.blogDetails')).not.toBeVisible(); //blog details are hidden
});

test("blog's URL/likes are shown when the button controlling the shown details has been clicked", async () => {
  const blogExample = {
    title: 'test blog',
    author: 'testAuthor',
    likes: 0,
    url: 'test.com',
    user: [{ name: 'testDbUser', username: 'testDbUsername' }]
  };
  const user = { username: 'testDbUsername' };
  const { container } = render(
    <Blog blog={blogExample} user={user} getBlogs={() => jest.fn()} />
  );
  const showButton = container.querySelector('button');
  const blogUser = userEvent.setup();
  await blogUser.click(showButton);
  const blogGlance = container.querySelector('.blogGlance');
  expect(blogGlance).toBeVisible(); //primary blog infos
  expect(blogGlance.querySelector('.blogDetails')).toBeVisible(); //blog details are shown as well
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  /* since the handleLikes is not received as props,
  we have to add onclick event for the sake of this test,
   otherwise  we have to test if the likes get updated,
   calling the orginal function will trigger a network request !
*/
  const likeMock = jest.fn();
  const blogExample = {
    title: 'test blog',
    author: 'testAuthor',
    likes: 0,
    url: 'test.com',
    user: [{ name: 'testDbUser', username: 'testDbUsername' }]
  };
  const user = { username: 'testDbUsername' };
  const { container } = render(
    <Blog blog={blogExample} user={user} getBlogs={() => jest.fn()} />
  );
  const likeButton = container.querySelector('.likeButton');
  likeButton.onclick = likeMock;
  const blogUser = userEvent.setup();
  await blogUser.click(likeButton);
  await blogUser.click(likeButton);
  expect(likeMock.mock.calls).toHaveLength(2);
});

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlogMock = jest.fn().mockResolvedValue(); //mocking createBlog promise
  const newBlog = {
    title: 'Using Jest for react apps',
    author: 'me',
    url: 'https://jestjs.io/'
  };
  const newBlogArr = Object.values(newBlog);
  const { container } = render(<BlogForm createBlog={createBlogMock} />);
  const addBlogButton = container.querySelector('.testAdd');
  const inputElements = container.querySelectorAll('input');
  const blogUser = userEvent.setup();
  for (let i = 0; i < inputElements.length; i++) {
    await blogUser.type(inputElements[i], newBlogArr[i]);
  }
  await blogUser.click(addBlogButton);
  expect(createBlogMock.mock.calls).toHaveLength(1);
  expect(createBlogMock.mock.calls[0][0]).toEqual(newBlog);
});
