'use server';

const Home = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes?id=52772`);
  const text = await response.text();

  return <p>Server says: {text}</p>;
};

export default Home;
