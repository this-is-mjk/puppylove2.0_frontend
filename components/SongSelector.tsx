import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  List,
  ListItem,
  Image,
  Text,
  HStack,
} from '@chakra-ui/react';

interface Song {
  videoId: string;
  name: string;
  artist?: string;
  thumbnail: string;
}

interface SongSelectorProps {
  onConfirm: (selectedSongId: string | null) => void;
}
const SERVER_IP = process.env.MUSIC_SERVER_IP;
const SongSelector: React.FC<SongSelectorProps> = ({ onConfirm }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch songs when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setSongs([]);
      return;
    }

    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_IP}/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: debouncedQuery }),
        });

        const data = await response.json();
        setSongs(data || []);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [debouncedQuery]);

  const handleSongSelection = (song: Song) => {
    setSelectedSong(song);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    onConfirm(selectedSong ? selectedSong.videoId : null);
    setSearchQuery('');
    setSongs([]);
    //console.log(selectedSong?.videoId)
  };

  const handleRemove = () => {
    setSelectedSong(null);
    setIsConfirmed(false);
    onConfirm(null);
  };

  return (
    <Box width="100%" padding={4}>
      <Input
        placeholder="Search for a song..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       
      />

      {isLoading && <Text style={{ width: "100%", textAlign: "center", fontSize: "20px", color: "#555" }}>Loading...</Text>}

      <List spacing={3} marginTop={4}>
        {songs.map((song) => (
          <ListItem
            key={song.videoId}
            cursor="pointer"
            onClick={() => handleSongSelection(song)}
            background={selectedSong?.videoId === song.videoId ? 'gray.800' : 'black.100'}
            padding={2}
            borderRadius="md"
            border="1px solid"
            borderColor={selectedSong?.videoId === song.videoId ? 'gray.600' : 'gray.700'}
          >
            <HStack>
              <Image src={song.thumbnail} boxSize="50px" borderRadius="md" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{song.name}</Text>
                {song.artist && <Text fontSize="sm">{song.artist}</Text>}
              </VStack>
            </HStack>
          </ListItem>
        ))}
      </List>

      {!isConfirmed && (
        <Button
          marginTop={4}
          colorScheme="blue"
          onClick={handleConfirm}
          isDisabled={!selectedSong}
          width="100%"
        >
          Confirm Selection
        </Button>
      )}

      {isConfirmed && (
        <Button
          marginTop={4}
          colorScheme="red"
          onClick={handleRemove}
          width="100%"
        >
          Remove Selection
        </Button>
      )}
    </Box>
  );
};

export default SongSelector;
