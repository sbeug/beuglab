import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTeamStore = defineStore('team', () => {
  const members = ref([
    {
      id: 1,
      name: 'Dr. Shawn Beug',
      edu: 'PhD',
      title: 'Principal Investigator, Scientist',
      photo: 'insertLinkHere',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      linkedin: 'https://www.linkedin.com/',
    },
    {
      id: 2,
      name: 'Dr. Eric LaCasse',
      edu: 'PhD',
      title: 'Principal Investigator, Scientist',
      photo: 'insertLinkHere',
      bio: 'Dr. Eric LaCasse is an innovator and a cancer researcher. He obtained his PhD in Biochemistry (uOttawa) and completed his post-doctoral training at the Ontario Cancer Institute (Toronto). He was previously Head of Oncology at the biotechnology company Aegera Therapeutics (Montreal). In 2004, Dr. LaCasse developed the first inhibitor-of-apoptosis (IAP) targeting drug, an antisense oligonucleotide to the X-linked IAP, to enter clinical trials and to show clinical activity. This validated the IAPs as cancer targets and launched small-molecule development campaigns to inhibit the IAPs. This resulted in Aegera entering the first ever bivalent IAP antagonist, known as a dimeric Smac mimetic, and coincidentally the first clinical homo-PROTAC or targeted protein degrader, into cancer trials in 2008. This provided in vivo proof-of-concept for a novel class of conjugate drugs capable of targeting proteins for ubiquitin- and proteasome-mediated degradation.',
      linkedin: 'https://www.linkedin.com/',
    },
    {
      id: 3,
      name: 'Noah Robert',
      edu: 'MSc',
      title: 'Researcher',
      photo: 'insertLinkHere',
      bio: 'Noah joined the lab as an Honours student in 2021. Under the co-supervision of Dr. Shawn Beug and Dr. Alp Oran, he investigated a candidate target identified through proteomic and ubiquitomic screening, focusing on its role in NF-κB signaling in T cells. He subsequently transitioned into a Master’s of Microbiology and Immunology program, co-supervised by Dr. Beug and Dr. Robert Korneluk, where he explored the therapeutic potential of IAP antagonists for treating Duchenne muscular dystrophy using the D2.mdx mouse model. Outside of the lab, Noah enjoys skiing, road or mountain biking and soccer.',
      linkedin: 'https://www.linkedin.com/',
    },
    {
      id: 4,
      name: 'Jordan Yin',
      edu: 'MSc',
      title: 'Researcher',
      photo: 'insertLinkHere',
      bio: 'Noah joined the lab as an Honours student in 2021. Under the co-supervision of Dr. Shawn Beug and Dr. Alp Oran, he investigated a candidate target identified through proteomic and ubiquitomic screening, focusing on its role in NF-κB signaling in T cells. He subsequently transitioned into a Master’s of Microbiology and Immunology program, co-supervised by Dr. Beug and Dr. Robert Korneluk, where he explored the therapeutic potential of IAP antagonists for treating Duchenne muscular dystrophy using the D2.mdx mouse model. Outside of the lab, Noah enjoys skiing, road or mountain biking and soccer.',
      linkedin: 'https://www.linkedin.com/',
    },
    {
      id: 5,
      name: 'Five',
      edu: 'MSc',
      title: 'Researcher',
      photo: 'insertLinkHere',
      bio: 'Noah joined the lab as an Honours student in 2021. Under the co-supervision of Dr. Shawn Beug and Dr. Alp Oran, he investigated a candidate target identified through proteomic and ubiquitomic screening, focusing on its role in NF-κB signaling in T cells. He subsequently transitioned into a Master’s of Microbiology and Immunology program, co-supervised by Dr. Beug and Dr. Robert Korneluk, where he explored the therapeutic potential of IAP antagonists for treating Duchenne muscular dystrophy using the D2.mdx mouse model. Outside of the lab, Noah enjoys skiing, road or mountain biking and soccer.',
      linkedin: 'https://www.linkedin.com/',
    },
    {
      id: 6,
      name: 'Six',
      edu: 'MSc',
      title: 'Researcher',
      photo: 'insertLinkHere',
      bio: 'Noah joined the lab as an Honours student in 2021. Under the co-supervision of Dr. Shawn Beug and Dr. Alp Oran, he investigated a candidate target identified through proteomic and ubiquitomic screening, focusing on its role in NF-κB signaling in T cells. He subsequently transitioned into a Master’s of Microbiology and Immunology program, co-supervised by Dr. Beug and Dr. Robert Korneluk, where he explored the therapeutic potential of IAP antagonists for treating Duchenne muscular dystrophy using the D2.mdx mouse model. Outside of the lab, Noah enjoys skiing, road or mountain biking and soccer.',
      linkedin: 'https://www.linkedin.com/',
    },
  ])
  return {
    members,
  }
})
